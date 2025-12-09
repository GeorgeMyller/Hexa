import { Language } from '../types';

export const translations = {
  en: {
    app: {
      name: "HEXA",
      subtitle: "Enterprise Code Intelligence",
      deepAnalysis: "Deep Scan",
      multiModule: "Hexa Protocol",
    },
    hero: {
      tagline: "AGENT-AS-A-SERVICE PLATFORM",
      title: "Deploy Your Engineering Board.",
      highlight: "Instantly.",
      subtitle: "HEXA orchestrates six specialized autonomous agents to dissect your codebase. From Architecture to Legal Compliance, get a CTO-level audit in seconds.",
      deploy: "Deploy HEXA Agents",
      connect: "Connect Google Account",
      demo: "View Live Demo",
      features: {
        instant: "Zero Setup",
        comprehensive: "360° Audit",
        secure: "Enterprise Secure"
      }
    },
    input: {
      title: "Initialize HEXA Engine",
      description: "Connect the Neural Board to your target repository. The 6-Agent Swarm will begin extraction immediately.",
      repoLabel: "Repository Endpoint",
      repoPlaceholder: "github.com/org/project",
      codeLabel: "Context / Source Injection",
      codePlaceholder: "// Paste critical modules, architecture diagrams, or raw code...\n// The Hexa Architects will parse this context.",
      buttonIdle: "Activate Protocol",
      buttonLoading: "Agents Deploying...",
    },
    loading: {
      title: "HEXA Protocol Active",
      step1: "Architect & QA Agents synchronizing...",
      step2: "Legal & Product Agents reviewing compliance...",
      step3: "Synthesizing strategic roadmap...",
    },
    error: {
      title: "Connection Severed",
      default: "The agent swarm encountered a critical error. Check inputs and retry.",
      retry: "Re-initialize",
    },
    report: {
      title: "Intelligence Briefing",
      metaTitle: "HEXA CORE OUTPUT",
      health: "Code Health",
      execSummary: "Executive Synthesis",
      quickWins: "Immediate Actions",
      risks: "Critical Vulnerabilities",
      roadmap: "Strategic Horizon",
      sources: "Intelligence Sources",
      specialists: "Agent Findings",
      newAnalysis: "New Session",
    },
    agents: {
      architect: "Architect",
      qa: "QA Engineer",
      docs: "Tech Writer",
      product: "Product Mgr",
      legal: "Legal Counsel",
      ai: "AI Engineer",
    }
  },
  pt: {
    app: {
      name: "HEXA",
      subtitle: "Inteligência de Código Empresarial",
      deepAnalysis: "Deep Scan",
      multiModule: "Protocolo Hexa",
    },
    hero: {
      tagline: "PLATAFORMA AGENT-AS-A-SERVICE",
      title: "Seu Board de Engenharia.",
      highlight: "Instantâneo.",
      subtitle: "O HEXA orquestra seis agentes autônomos especializados para dissecar seu código. Da Arquitetura ao Jurídico, obtenha uma auditoria nível CTO em segundos.",
      deploy: "Implantar Agentes",
      connect: "Conectar Conta Google",
      demo: "Ver Demo",
      features: {
        instant: "Zero Config",
        comprehensive: "Auditoria 360°",
        secure: "Segurança Enterprise"
      }
    },
    input: {
      title: "Inicializar HEXA Engine",
      description: "Conecte o Board Neural ao seu repositório alvo. O enxame de 6 agentes iniciará a extração imediatamente.",
      repoLabel: "Endpoint do Repositório",
      repoPlaceholder: "github.com/org/projeto",
      codeLabel: "Injeção de Contexto / Fonte",
      codePlaceholder: "// Cole módulos críticos, diagramas ou código bruto...\n// Os Arquitetos do Hexa analisarão este contexto.",
      buttonIdle: "Ativar Protocolo",
      buttonLoading: "Implantando Agentes...",
    },
    loading: {
      title: "Protocolo HEXA Ativo",
      step1: "Sincronizando Agentes de Arquitetura e QA...",
      step2: "Agentes Jurídico e Produto revisando conformidade...",
      step3: "Sintetizando roadmap estratégico...",
    },
    error: {
      title: "Conexão Interrompida",
      default: "O enxame de agentes encontrou um erro crítico. Verifique os dados e tente novamente.",
      retry: "Reinicializar",
    },
    report: {
      title: "Briefing de Inteligência",
      metaTitle: "OUTPUT DO HEXA CORE",
      health: "Saúde do Código",
      execSummary: "Síntese Executiva",
      quickWins: "Ações Imediatas",
      risks: "Vulnerabilidades Críticas",
      roadmap: "Horizonte Estratégico",
      sources: "Fontes de Inteligência",
      specialists: "Descobertas dos Agentes",
      newAnalysis: "Nova Sessão",
    },
    agents: {
      architect: "Arquiteto",
      qa: "Eng. de QA",
      docs: "Tech Writer",
      product: "Gerente Prod.",
      legal: "Jurídico",
      ai: "Eng. de IA",
    }
  }
};

export const getTranslation = (lang: Language) => translations[lang];