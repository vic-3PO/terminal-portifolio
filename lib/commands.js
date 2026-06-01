import { getRandomArt } from "./ascii-art";

export const commands = {
  help: {
    description: "Mostrar comandos disponíveis",
    execute: () => {
      return {
        output: `
Comandos Disponíveis:
=====================
help         - Exibe esta lista de comandos
sobre        - Sobre mim
experiencia  - Experiência profissional
projetos     - Meus projetos
skills       - Habilidades técnicas
educacao     - Formação acadêmica
contato      - Informações de contato
clear        - Limpar o terminal
secret       - ????

Dica: Use TAB para auto-completar e ↑↓ para histórico de comandos
        `,
        ascii: null,
      };
    },
  },

  sobre: {
    description: "Sobre mim",
    execute: () => {
      return {
        output: `
Sobre Mim
=========
Oi, me chamo Victor Macário 👋
Full-Stack Developer com 6+ anos de experiência entregando
sistemas web escaláveis nos setores de fintech e enterprise.

Especializado em React, Next.js, Node.js, TypeScript e Python,
com experiência em pipelines de dados com IA e plataformas
de agentes inteligentes em produção.

📍 Localização: São Paulo, Brasil (aberto a remoto / realocação)
🎓 Pós-graduado em Data Science & Machine Learning — PUC-Campinas
🚀 Filosofia: "Codar é arte" — e toda arte é uma jornada.
📚 Recomendações: Leia *A Divina Comédia*, de Dante Alighieri.
      `,
        ascii: getRandomArt("sobre"),
      };
    },
  },

  experiencia: {
    description: "Experiência profissional",
    execute: () => {
      return {
        output: `
Experiência Profissional
========================

Callink — Contact Center & AI Platform
  Full-Stack Developer · Mar 2025 – Presente · São Paulo (Híbrido)
  • Reduziu ciclo de deploy em ~60% com CI/CD (GitHub Actions + Docker)
  • Reduziu duplicação de código em ~35% via monorepo Next.js multizones
  • Comprimiu ciclos de pesquisa de IA de dias para menos de 1 hora
    (plataforma de agentes inteligentes com Keycloak e generative AI)

FIS Brasil (adquirido pela Callink)
  Analista de Desenvolvimento · Jun 2024 – Mar 2025 · São Paulo (Híbrido)
  • Recuperou ~10h/semana de esforço manual com automações Python
    para ingestão, transformação e relatórios de dados financeiros
  • Reduziu taxa de erros em ~70% com pipelines de validação automatizados

Freelance Full-Stack Developer
  Contractor Independente · Mar 2023 – Presente · Remoto
  • +10 apps e APIs entregues em produção no prazo
    (fintech, e-commerce, serviços) com React, Next.js, Node.js e Python,
    incluindo sistemas RBAC/2FA e integrações com APIs de terceiros
        `,
        ascii: null,
      };
    },
  },

  projetos: {
    description: "Ver meus projetos",
    execute: () => {
      return {
        output: `
Projetos
========

1. AI Agent Research Platform  (Callink, 2025)
   - Next.js, Node.js, Keycloak, Generative AI
   - Plataforma interna para criar agentes de IA e rodar campanhas
     de pesquisa automatizadas em escala
   - Ciclo de pesquisa: de dias para minutos

2. IO System  (2025)
   - Python, Ollama, FastAPI, Keycloak
   - Observer de erros em tempo real para RPAs e automações Python
   - Diagnóstico via LLM local com até 3 correções acionáveis por falha

3. Vampaginas
   - React, Firebase, Google Books API
   - Plataforma pública de descoberta literária com filtros personalizados
   - https://vampaginas.vercel.app

4. FangTalk
   - Next.js, TailwindCSS, Clerk, Drizzle ORM, PostgreSQL
   - Sistema robusto de autenticação e banco relacional

5. Portfólio Pessoal
   - Next.js, TailwindCSS, animações, tema dark
   - https://victorlopesm.vercel.app
        `,
        ascii: getRandomArt("projetos"),
      };
    },
  },

  skills: {
    description: "Minhas habilidades técnicas",
    execute: () => {
      return {
        output: `
Habilidades Técnicas
====================

💻 Linguagens & Frameworks:
  TypeScript · JavaScript (ES6+) · Python
  React · Next.js · Node.js · Angular · Express.js · FastAPI

🗄️ Bancos de Dados:
  PostgreSQL · MongoDB · DynamoDB · SQLite · AWS RDS

☁️ Cloud & DevOps:
  AWS (EC2, S3, RDS, VPC, Lightsail)
  Docker · GitHub Actions · CI/CD · Monorepo · Multizones

🧪 Testes:
  Jest · Cypress · E2E · QA

🔐 Auth & AI:
  JWT · RBAC · 2FA · Keycloak
  Orquestração de pipelines de IA · Generative AI · Ollama (LLM local)
        `,
        ascii: getRandomArt("skills"),
      };
    },
  },

  educacao: {
    description: "Formação acadêmica",
    execute: () => {
      return {
        output: `
Formação Acadêmica
==================

🎓 PUC-Campinas — Pontifícia Universidade Católica de Campinas
   Pós-graduação em Data Science e Machine Learning
   2024 – 2025

🎓 UNIFACCAMP — Centro Universitário Campo Limpo Paulista
   Bacharelado em Ciência da Computação
   2018 – 2022
        `,
        ascii: null,
      };
    },
  },

  contato: {
    description: "Informações de contato",
    execute: () => {
      return {
        output: `
Contato
=======

📧 Email:     victorlopesmacario@gmail.com
💼 LinkedIn:  linkedin.com/in/victorlopesm
🐙 GitHub:    github.com/vic-3PO
🌐 Portfólio: victorlopesm.vercel.app

Quer iniciar um projeto comigo?
➡️ Me envie uma mensagem ou proposta de colaboração!
        `,
        ascii: getRandomArt("contato"),
      };
    },
  },

  clear: {
    description: "Limpar o terminal",
    execute: () => ({
      output: "",
      clear: true,
    }),
  },

  secret: {
    description: "Easter egg secreto",
    execute: () => {
      return {
        output: `
Você descobriu o segredo! 🎉

Fato curioso: Este terminal foi desenvolvido com Next.js,
Tailwind, React Hooks e muita criatividade 🚀☕
        `,
        ascii: getRandomArt("easteregg"),
      };
    },
  },
};

export function executeCommand(input) {
  const trimmedInput = input.trim().toLowerCase();

  if (!trimmedInput) return { output: "", ascii: null };

  const command = commands[trimmedInput];

  if (command) return command.execute();

  return {
    output: `Comando não encontrado: ${input}\nDigite 'help' para ver os comandos disponíveis.`,
    ascii: null,
  };
}

export function getCommandSuggestions(input) {
  if (!input) return Object.keys(commands);

  const lowerInput = input.toLowerCase();
  return Object.keys(commands).filter((cmd) => cmd.startsWith(lowerInput));
}
