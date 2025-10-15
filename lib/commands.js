import { getRandomArt } from "./ascii-art";

export const commands = {
  help: {
    description: "Mostrar comandos disponíveis",
    execute: () => {
      return {
        output: `
Comandos Disponíveis:
=====================
help       - Exibe esta lista de comandos
sobre      - Sobre mim
projetos   - Ver meus projetos
skills     - Minhas habilidades técnicas
contato    - Informações de contato
clear      - Limpar o terminal
secret     - ????


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
==========
Oi, me chamo Victor 👋
Sou desenvolvedor focado em criar soluções web seguras,
performáticas e com design moderno.

Nos últimos 5 anos, atuei com frontend e backend para 
entregar aplicações dinâmicas e experiências digitais incríveis.

🎓 Formação: Ciência da Computação
💼 Experiência: +5 anos em desenvolvimento web
🌍 Localização: Marte (disponível para trabalho remoto)
🚀 Filosofia: "Codar é arte" — e toda arte é uma jornada.
📚 Recomendações: Leia *A Divina Comédia*, de Dante Alighieri,
um clássico que inspira sobre criação, superação e ascensão.
      `,
        ascii: getRandomArt("sobre"),
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

1. Vampáginas
   - React, Styled Components, React Router, Axios
   - Interface dinâmica e estilização moderna
   - [Leia sobre](https://victorlopesportifolio.vercel.app/#project)

2. FangTalk
   - Next.js, TailwindCSS, Clerk, Drizzle ORM, PostgreSQL
   - Sistema robusto de autenticação e banco relacional
   - [Leia sobre](https://victorlopesportifolio.vercel.app/#project)

3. Sizing de Aplicações
   - HTML, CSS, JavaScript, Chart.js
   - Ferramenta visual de dimensionamento interativo
   - [Leia sobre](https://victorlopesportifolio.vercel.app/#project)

4. Portfólio Pessoal
   - [victorlopesportifolio.vercel.app](https://victorlopesportifolio.vercel.app)
   - Next.js, TailwindCSS, animações, tema dark, integração com redes
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

💻 Frontend:
  • React / Next.js / Vite.js
  • TypeScript / JavaScript
  • Tailwind CSS / Styled Components
  • HTML5 / CSS3 / WordPress

🔧 Backend:
  • Node.js / Express / APIs REST
  • Python / Django
  • SQLite / PostgreSQL

🗄️ Ferramentas e Versionamento:
  • Git / GitHub / Microsoft
  • CI/CD / Vercel / Docker

🧠 Outras Skills:
  • Design Responsivo
  • UX/UI Thinking
  • Documentação Técnica
        `,
        ascii: getRandomArt("skills"),
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

📧 Email: [victorlopesmacario@gmail.com](mailto:victorlopesmacario@gmail.com)
💼 LinkedIn: [linkedin.com/in/victorlopesm](https://www.linkedin.com/in/victorlopesm/)
🐙 GitHub: [github.com/yourprofile](https://github.com/yourprofile)
🌐 Portfólio: [victorlopesportifolio.vercel.app](https://victorlopesportifolio.vercel.app)

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
    output: `Comando não encontrado: \${input}\\nDigite 'help' para ver os comandos disponíveis.`,
    ascii: null,
  };
}

export function getCommandSuggestions(input) {
  if (!input) return Object.keys(commands);

  const lowerInput = input.toLowerCase();
  return Object.keys(commands).filter((cmd) => cmd.startsWith(lowerInput));
}
