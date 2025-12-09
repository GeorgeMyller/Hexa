
# Hexa

O **Hexa** é uma ferramenta avançada baseada em IA projetada para analisar repositórios de software. Ele utiliza os modelos Gemini do Google para avaliar bases de código sob a perspectiva de múltiplos agentes de IA especializados, fornecendo feedback abrangente, pontuação e insights acionáveis.

[Read in English](./README.md)

## 🚀 Funcionalidades

- **Análise Multi-Agente**: Avalia seu código a partir de múltiplas perspectivas:
  - **Arquiteto de Software**: Estrutura, padrões e escalabilidade.
  - **Engenheiro de QA**: Cobertura de testes e confiabilidade.
  - **Redator Técnico**: Qualidade da documentação.
  - **Gerente de Produto**: Alinhamento de funcionalidades e valor.
  - **Consultor Jurídico**: Licenciamento e conformidade.
  - **Engenheiro de IA**: Integração de IA e adequação da stack.
- **Powered by Gemini**: Aproveita o poder dos modelos Gemini 1.5 Pro e Flash do Google para uma compreensão profunda do código.
- **Interface Interativa**: Interface React limpa e moderna para fácil interação e visualização de relatórios.
- **Gerenciamento de Histórico**: Salva automaticamente relatórios de avaliação localmente para referência futura.
- **Suporte Bilíngue**: Totalmente localizado em Inglês e Português.

## 🛠️ Stack Tecnológica

- **Frontend**: React, Vite, TypeScript
- **Estilo**: TailwindCSS
- **Integração de IA**: Google Generative AI (Gemini)
- **Ícones**: Lucide React

## 🏁 Começando

### Pré-requisitos

- **Node.js**: Certifique-se de ter o Node.js instalado (versão 18+ recomendada).
- **Chave de API Gemini**: Você precisará de uma chave de API do [Google AI Studio](https://aistudio.google.com/).

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-repositorio>
    cd <diretorio-do-repositorio>
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

### Rodando o App

1.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

2.  **Abra no Navegador:**
    Navegue até `http://localhost:5173` (ou a porta mostrada no seu terminal).

3.  **Configure a Chave de API:**
    - Clique no ícone de configurações ou no botão "Check API Key".
    - Insira sua chave de API Gemini.
    - A chave é armazenada localmente no seu navegador para conveniência.

## 📖 Uso

1.  **Insira os Detalhes do Repositório**: Cole a URL do GitHub do repositório que você deseja analisar.
2.  **Inicie a Análise**: Clique em "Analyze Repository" (Analisar Repositório). O sistema irá clonar (conceitualmente, ou via API) e analisar a base de código.
3.  **Visualize o Relatório**: Explore o relatório detalhado, incluindo pontuação geral, descobertas específicas por agente, roadmap e vitórias rápidas ("quick wins").
4.  **Gerencie o Histórico**: Acesse relatórios anteriores na gaveta de histórico.

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, veja nosso [Guia de Contribuição](CONTRIBUTING.pt-BR.md) para detalhes.
Por favor, revise também nosso [Código de Conduta](CODE_OF_CONDUCT.pt-BR.md) antes de participar.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

