<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# CodeCrew ADK Evaluator

The **CodeCrew ADK Evaluator** is an advanced AI-powered tool designed to analyze software repositories. It utilizes Google's Gemini models to evaluate codebases through the lens of multiple specialized AI agents, providing comprehensive feedback, scoring, and actionable insights.

[Legado em Português](./README.pt-BR.md)

## 🚀 Features

- **Multi-Agent Analysis**: Evaluates your code from multiple perspectives:
  - **Software Architect**: Structure, patterns, and scalability.
  - **QA & Test Engineer**: Testing coverage and reliability.
  - **Technical Writer**: Documentation quality.
  - **Product Manager**: Feature alignment and value.
  - **Legal Consultant**: Licensing and compliance.
  - **AI Engineer**: AI integration and stack suitability.
- **Gemini Powered**: Leverages the power of Google's Gemini 1.5 Pro and Flash models for deep code understanding.
- **Interactive UI**: Clean, modern React interface for easy interaction and report viewing.
- **History Management**: Automatically saves evaluation reports locally for future reference.
- **Bilingual Support**: Fully localized in English and Portuguese.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, TypeScript
- **Styling**: TailwindCSS
- **AI Integration**: Google Generative AI (Gemini)
- **Icons**: Lucide React

## 🏁 Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (version 18+ recommended).
- **Gemini API Key**: You'll need an API key from [Google AI Studio](https://aistudio.google.com/).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the App

1.  **Start the development server:**
    ```bash
    npm run dev
    ```

2.  **Open in Browser:**
    Navigate to `http://localhost:5173` (or the port shown in your terminal).

3.  **Configure API Key:**
    - Click on the settings icon or the "Check API Key" button.
    - Enter your Gemini API key.
    - The key is stored locally in your browser for convenience.

## 📖 Usage

1.  **Enter Repository Details**: Paste the GitHub URL of the repository you want to analyze.
2.  **Start Analysis**: Click "Analyze Repository". The system will clone (conceptually, or via API) and analyze the codebase.
3.  **View Report**: Explore the detailed report, including overall score, agent-specific findings, roadmap, and quick wins.
4.  **Manage History**: Access previous reports from the history drawer.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.
Please also review our [Code of Conduct](CODE_OF_CONDUCT.md) before participating.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

