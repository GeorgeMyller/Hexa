interface RepoInfo {
  owner: string;
  repo: string;
}

const parseRepoUrl = (url: string): RepoInfo | null => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname !== 'github.com') return null;
    const parts = urlObj.pathname.split('/').filter(Boolean);
    if (parts.length < 2) return null;
    return { owner: parts[0], repo: parts[1] };
  } catch (e) {
    return null;
  }
};

export const fetchRepoContext = async (repoUrl: string): Promise<string> => {
  const repoInfo = parseRepoUrl(repoUrl);
  if (!repoInfo) return "";

  const { owner, repo } = repoInfo;
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;
  
  let context = `\n\n========== GITHUB REPOSITORY CONTEXT ==========\n`;
  context += `Repo: ${owner}/${repo}\n`;

  try {
    // 1. Metadata & Default Branch
    const metaRes = await fetch(apiUrl);
    if (!metaRes.ok) {
        if (metaRes.status === 403 || metaRes.status === 429) {
            context += `(GitHub API Rate Limit exceeded. Unable to fetch file tree. Analyzing based on available public info.)\n`;
            return context;
        }
        return context + `(Unable to access repository metadata)\n`;
    }
    const meta = await metaRes.json();
    const defaultBranch = meta.default_branch || 'main';
    
    context += `Description: ${meta.description || 'N/A'}\n`;
    context += `Language: ${meta.language} | Stars: ${meta.stargazers_count} | Forks: ${meta.forks_count}\n`;
    
    // 2. File Tree (Recursive)
    // Limit file listing to prevent token overflow
    const treeUrl = `${apiUrl}/git/trees/${defaultBranch}?recursive=1`;
    const treeRes = await fetch(treeUrl);
    if (treeRes.ok) {
        const treeData = await treeRes.json();
        const files = treeData.tree
            .filter((node: any) => node.type === 'blob')
            .map((node: any) => node.path);
            
        // Heuristic: Take top 300 files, prioritizing root files and src/
        const limitedFiles = files.slice(0, 300); 
        context += `\n[File Structure (Top ${limitedFiles.length} files)]:\n${limitedFiles.join('\n')}\n`;
        if (files.length > 300) context += `... (${files.length - 300} more files omitted)\n`;
    }

    // 3. Critical Files Content (Raw)
    // We try to fetch content for key files: README, package.json, requirements.txt, etc.
    const filesToFetch = [
        'README.md', 
        'package.json', 
        'requirements.txt', 
        'go.mod', 
        'Cargo.toml', 
        'pom.xml',
        'composer.json',
        'Dockerfile',
        'Makefile'
    ];
    
    context += `\n[Key Files Content]:\n`;

    // Use Promise.all to fetch in parallel
    const filePromises = filesToFetch.map(async (filename) => {
        const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/${filename}`;
        try {
            const res = await fetch(rawUrl);
            if (res.ok) {
                const text = await res.text();
                // Truncate if too long (e.g. 10KB limit per file)
                const truncatedText = text.length > 10000 ? text.substring(0, 10000) + "\n...(Truncated)" : text;
                return `--- ${filename} ---\n${truncatedText}\n`;
            }
        } catch (e) {
            // Ignore missing files
        }
        return null;
    });

    const fileContents = await Promise.all(filePromises);
    context += fileContents.filter(Boolean).join('\n');

  } catch (error: any) {
    console.warn("GitHub fetch error:", error);
    context += `\n(Error fetching repository details: ${error.message})\n`;
  }

  return context;
};
