export class InputGuard {
  // Patterns that indicate an attempt to override system instructions
  private static PROMPT_INJECTION_PATTERNS = [
    /ignore previous instructions/i,
    /ignore all previous instructions/i,
    /forget all previous instructions/i,
    /system override/i,
  ];

  // Patterns that look like dangerous code execution
  // Matches the Python ADK 'DANGEROUS_CODE_PATTERNS'
  private static DANGEROUS_CODE_PATTERNS = [
    /delete all files/i,
    /rm -rf/i,
    /drop table/i,
    /exec\s*\(/i,
    /eval\s*\(/i,
    /import\s+os/i,
    /import\s+sys/i,
    /sudo\s+/i,
  ];

  /**
   * Validates a user prompt against known injection patterns.
   * Based on the Python validate_prompt method.
   * 
   * @param input The text to validate
   * @param checkCodePatterns Whether to check for dangerous code patterns (default: true). 
   *                          Should be false for code analysis contexts where 'import os' is valid code.
   */
  static validate(
    input: string,
    checkCodePatterns: boolean = true
  ): { isValid: boolean; error?: string } {
    if (!input) return { isValid: true };
    
    const MAX_LENGTH = 100000;
    if (input.length > MAX_LENGTH) {
      return { isValid: false, error: `Security Alert: Input too long (max ${MAX_LENGTH} chars)` };
    }

    // Check against prompt injection patterns (ALWAYS CHECKED)
    for (const pattern of this.PROMPT_INJECTION_PATTERNS) {
      if (pattern.test(input)) {
        console.warn(`Security Risk: Prompt injection detected matching ${pattern.source}`);
        return { isValid: false, error: "Security Alert: Potential prompt injection detected. Request blocked." };
      }
    }

    // Check against dangerous code patterns (OPTIONAL)
    if (checkCodePatterns) {
      for (const pattern of this.DANGEROUS_CODE_PATTERNS) {
        if (pattern.test(input)) {
           console.warn(`Security Risk: Dangerous code detected matching ${pattern.source}`);
           return { isValid: false, error: "Security Alert: Potential dangerous code execution pattern detected. Request blocked." };
        }
      }
    }

    return { isValid: true };
  }
}