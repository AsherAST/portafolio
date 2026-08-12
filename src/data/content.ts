export type Language = "es" | "en";

export interface NavLink {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  description: string;
  stack: string[];
  features: string[];
  links: { label: string; href: string }[];
  image?: string;
}

export interface SiteContent {
  personal: {
    name: string;
    role: string;
    email: string;
    github: string;
    linkedin: string;
    location: string;
  };
  nav: NavLink[];
  hero: {
    greeting: string;
    role: string;
    summary: string;
    ctaProjects: string;
    ctaContact: string;
  };
  about: {
    title: string;
    paragraphs: string[];
    downloadCv: string;
  };
  skills: {
    title: string;
    subtitle: string;
    categories: { name: string; items: string[] }[];
  };
  projects: {
    title: string;
    subtitle: string;
    viewSite: string;
    viewCode: string;
    list: Project[];
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      success: string;
      error: string;
      errors: {
        name: string;
        emailRequired: string;
        emailInvalid: string;
        message: string;
      };
    };
  };
  footer: {
    rights: string;
    emailCopied: string;
  };
}

export const placeholders = {
  github: "https://github.com/AsherAST",
  linkedin: "https://www.linkedin.com/in/damian-espinosa-6b46a8277",
  cv: "/cv-damian-espinosa.pdf",
};

export const navLinks: NavLink[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
];

const content: Record<Language, SiteContent> = {
  es: {
    personal: {
      name: "Damian Espinosa",
      role: "Desarrollador Web",
      email: "damianespinosadev@gmail.com",
      github: placeholders.github,
      linkedin: placeholders.linkedin,
      location: "México",
    },
    nav: navLinks,
    hero: {
      greeting: "Hola, soy",
      role: "Desarrollador Web",
      summary:
        "Construyo aplicaciones web modernas y accesibles con React, Next.js y TypeScript, enfocadas en calidad, rendimiento y una gran experiencia de usuario.",
      ctaProjects: "Ver proyectos",
      ctaContact: "Contáctame",
    },
    about: {
      title: "Sobre mí",
      paragraphs: [
        "Soy desarrollador web apasionado por crear aplicaciones rápidas, accesibles y bien diseñadas. Trabajo principalmente con el ecosistema React/Next.js y TypeScript.",
        "Me gusta escribir código con buenas prácticas: componentes reutilizables, pruebas automatizadas y despliegue continuo. Siempre estoy aprendiendo y mejorando mis habilidades.",
      ],
      downloadCv: "Descargar CV",
    },
    skills: {
      title: "Habilidades",
      subtitle:
        "Tecnologías y herramientas que uso para construir aplicaciones web de principio a fin.",
      categories: [
        { name: "Frontend", items: ["Next.js", "React", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS"] },
        { name: "Backend y APIs", items: ["Node.js", "API Routes (Next.js)", "Server Actions", "Prisma ORM", "PostgreSQL (Neon)", "JWT / sesiones", "Zod", "REST", "Resend (email)"] },
        { name: "Testing y calidad", items: ["Vitest", "Testing Library", "Playwright", "ESLint"] },
        { name: "Herramientas", items: ["Git", "GitHub", "Vercel", "npm"] },
      ],
    },
    projects: {
      title: "Proyectos",
      subtitle:
        "Proyectos web reales. Se irán añadiendo más conforme avance mi portafolio.",
      viewSite: "Ver sitio",
      viewCode: "Ver código",
      list: [
        {
          title: "Tienda Online",
          description:
            "E-commerce full-stack: catálogo con búsqueda y filtros, carrito persistente, checkout con pedidos y panel de administración con roles de usuario.",
          stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL (Neon)", "Auth.js", "Tailwind CSS", "Vitest", "Vercel Blob"],
          features: [
            "Autenticación con roles (cliente/admin) usando Auth.js v5",
            "Catálogo con búsqueda, filtros por categoría/precio y paginación",
            "Carrito en cookies con checkout transaccional y descuento de stock",
            "Panel admin: CRUD de productos con imágenes (Vercel Blob) y gestión de pedidos",
            "62 tests unitarios y CI con GitHub Actions",
          ],
          links: [
            { label: "Ver sitio", href: "https://tienda-puce-nine.vercel.app" },
            { label: "Ver código", href: "https://github.com/AsherAST/tienda" },
          ],
          image: "/projects/tienda.png",
        },
        {
          title: "TaskFlow",
          description:
            "Gestor de tareas tipo Kanban full-stack: tableros, columnas y tareas con arrastrar y soltar, registro/login con sesiones seguras y base de datos PostgreSQL.",
          stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL (Neon)", "JWT", "Tailwind CSS", "Vitest", "Playwright"],
          features: [
            "Autenticación de cero: bcrypt + sesiones JWT en cookies httpOnly",
            "Tablero Kanban con drag & drop nativo y actualizaciones optimistas",
            "Backend con Server Actions + API Routes y validación con Zod",
            "PostgreSQL (Neon) con Prisma, migraciones y datos de ejemplo",
            "31 tests unitarios + 2 e2e y CI con GitHub Actions",
          ],
          links: [
            { label: "Ver sitio", href: "https://taskflow-six-lac.vercel.app" },
            { label: "Ver código", href: "https://github.com/AsherAST/taskflow" },
          ],
          image: "/projects/taskflow.png",
        },
        {
          title: "Dashboard — Sistema de gestión",
          description:
            "Panel de administración de inventario y ventas: KPIs, gráficas de ventas, tablas con búsqueda/paginación y alertas de stock bajo. Roles de administrador y de solo lectura, con exportación CSV/PDF.",
          stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL (Neon)", "Auth.js", "Recharts", "Tailwind CSS", "Vitest", "pdf-lib"],
          features: [
            "Roles ADMIN/VIEWER (solo lectura) con panel de usuarios exclusivo para administradores",
            "Dashboard con KPIs y gráficas Recharts: ventas por día, por categoría, top productos y estados",
            "Tablas de inventario y ventas con búsqueda, filtros, orden y paginación",
            "Alertas de stock bajo y exportación de datos a CSV y PDF",
            "32 tests unitarios y CI con GitHub Actions",
          ],
          links: [
            { label: "Ver sitio", href: "https://dashboard-gamma-roan-35.vercel.app" },
            { label: "Ver código", href: "https://github.com/AsherAST/dashboard" },
          ],
        },
        {
          title: "Constructora Horizonte",
          description:
            "Sitio web profesional para una empresa constructora: páginas de servicios, proyectos con galería, equipo, clientes y formulario de contacto funcional.",
          stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vitest", "Playwright", "Resend"],
          features: [
            "Desarrollado con Next.js 16 y TypeScript",
            "Suite de pruebas: 10+ componentes con Vitest y tests e2e con Playwright",
            "Formulario de contacto con envío de emails (Resend)",
            "Desplegado en Vercel",
          ],
          links: [
            { label: "Ver sitio", href: "https://constructora-six-theta.vercel.app" },
            { label: "Ver código", href: "https://github.com/AsherAST/constructora" },
          ],
        },
        {
          title: "Chat en tiempo real",
          description:
            "Aplicación de chat por salas con Socket.io: mensajes en vivo con persistencia, presencia de usuarios online e indicador de escritura. Custom server Node con sesiones JWT propias.",
          stack: ["Next.js", "React", "TypeScript", "Socket.io", "Prisma", "PostgreSQL (Neon)", "JWT", "Tailwind CSS", "Vitest"],
          features: [
            "Autenticación de cero: bcrypt + sesiones JWT (jose) en cookies httpOnly, aplicada también a las conexiones de Socket.io",
            "Salas con historial desde la base de datos y envío de mensajes en tiempo real con confirmación (ack)",
            "Presencia: lista de usuarios en línea por sala, actualizada al entrar, salir o desconectarse",
            "Indicador 'escribiendo…' en vivo con throttle de emisión",
            "33 tests unitarios y CI con GitHub Actions",
          ],
          links: [
            { label: "Ver código", href: "https://github.com/AsherAST/chat" },
          ],
        },
      ],
    },
    contact: {
      title: "Contacto",
      subtitle:
        "¿Tienes un proyecto en mente o una oportunidad laboral? Escríbeme y te responderé lo antes posible.",
      form: {
        name: "Nombre",
        namePlaceholder: "Tu nombre",
        email: "Email",
        emailPlaceholder: "tu@email.com",
        message: "Mensaje",
        messagePlaceholder: "Cuéntame sobre tu proyecto...",
        submit: "Enviar mensaje",
        success: "¡Mensaje enviado! Te responderé pronto.",
        error: "Hubo un error al enviar el mensaje. Inténtalo de nuevo.",
        errors: {
          name: "Escribe tu nombre.",
          emailRequired: "Escribe tu correo electrónico.",
          emailInvalid: "El correo no es válido.",
          message: "Escribe tu mensaje.",
        },
      },
    },
    footer: {
      rights: "Todos los derechos reservados.",
      emailCopied: "¡Correo copiado!",
    },
  },
  en: {
    personal: {
      name: "Damian Espinosa",
      role: "Web Developer",
      email: "damianespinosadev@gmail.com",
      github: placeholders.github,
      linkedin: placeholders.linkedin,
      location: "Mexico",
    },
    nav: [
      { label: "Home", href: "#inicio" },
      { label: "About", href: "#sobre-mi" },
      { label: "Skills", href: "#habilidades" },
      { label: "Projects", href: "#proyectos" },
      { label: "Contact", href: "#contacto" },
    ],
    hero: {
      greeting: "Hi, I'm",
      role: "Web Developer",
      summary:
        "I build modern, accessible web applications with React, Next.js and TypeScript, focused on quality, performance and great user experience.",
      ctaProjects: "View projects",
      ctaContact: "Contact me",
    },
    about: {
      title: "About me",
      paragraphs: [
        "I'm a web developer passionate about building fast, accessible and well-designed applications. I mainly work with the React/Next.js ecosystem and TypeScript.",
        "I enjoy writing code with good practices: reusable components, automated tests and continuous deployment. I'm always learning and improving my skills.",
      ],
      downloadCv: "Download CV",
    },
    skills: {
      title: "Skills",
      subtitle:
        "Technologies and tools I use to build web applications from start to finish.",
      categories: [
        { name: "Frontend", items: ["Next.js", "React", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS"] },
        { name: "Backend & APIs", items: ["Node.js", "API Routes (Next.js)", "Server Actions", "Prisma ORM", "PostgreSQL (Neon)", "JWT / sessions", "Zod", "REST", "Resend (email)"] },
        { name: "Testing & Quality", items: ["Vitest", "Testing Library", "Playwright", "ESLint"] },
        { name: "Tools", items: ["Git", "GitHub", "Vercel", "npm"] },
      ],
    },
    projects: {
      title: "Projects",
      subtitle:
        "Real web projects. More will be added as my portfolio grows.",
      viewSite: "View site",
      viewCode: "View code",
      list: [
        {
          title: "Tienda Online",
          description:
            "Full-stack e-commerce: catalog with search and filters, persistent cart, checkout with orders and an admin panel with user roles.",
          stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL (Neon)", "Auth.js", "Tailwind CSS", "Vitest", "Vercel Blob"],
          features: [
            "Role-based authentication (customer/admin) with Auth.js v5",
            "Catalog with search, category/price filters and pagination",
            "Cookie-based cart with transactional checkout and stock deduction",
            "Admin panel: product CRUD with images (Vercel Blob) and order management",
            "62 unit tests and GitHub Actions CI",
          ],
          links: [
            { label: "View site", href: "https://tienda-puce-nine.vercel.app" },
            { label: "View code", href: "https://github.com/AsherAST/tienda" },
          ],
          image: "/projects/tienda.png",
        },
        {
          title: "TaskFlow",
          description:
            "Full-stack Kanban task manager: boards, columns and tasks with drag & drop, sign up/login with secure sessions and a PostgreSQL database.",
          stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL (Neon)", "JWT", "Tailwind CSS", "Vitest", "Playwright"],
          features: [
            "Authentication from scratch: bcrypt + JWT sessions in httpOnly cookies",
            "Kanban board with native drag & drop and optimistic updates",
            "Backend with Server Actions + API Routes and Zod validation",
            "PostgreSQL (Neon) with Prisma, migrations and seed data",
            "31 unit tests + 2 e2e tests and GitHub Actions CI",
          ],
          links: [
            { label: "View site", href: "https://taskflow-six-lac.vercel.app" },
            { label: "View code", href: "https://github.com/AsherAST/taskflow" },
          ],
          image: "/projects/taskflow.png",
        },
        {
          title: "Dashboard — Management System",
          description:
            "Inventory and sales admin panel: KPIs, sales charts, tables with search/pagination and low-stock alerts. Admin and read-only roles, with CSV/PDF export.",
          stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL (Neon)", "Auth.js", "Recharts", "Tailwind CSS", "Vitest", "pdf-lib"],
          features: [
            "ADMIN/VIEWER roles (read-only) with an admin-only user management page",
            "Dashboard with KPIs and Recharts charts: daily sales, by category, top products and statuses",
            "Inventory and sales tables with search, filters, sorting and pagination",
            "Low-stock alerts and CSV/PDF data export",
            "32 unit tests and GitHub Actions CI",
          ],
          links: [
            { label: "View site", href: "https://dashboard-gamma-roan-35.vercel.app" },
            { label: "View code", href: "https://github.com/AsherAST/dashboard" },
          ],
        },
        {
          title: "Constructora Horizonte",
          description:
            "Professional website for a construction company: services, projects with gallery, team, clients and a working contact form.",
          stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vitest", "Playwright", "Resend"],
          features: [
            "Built with Next.js 16 and TypeScript",
            "Test suite: 10+ components with Vitest and e2e tests with Playwright",
            "Contact form with email delivery (Resend)",
            "Deployed on Vercel",
          ],
          links: [
            { label: "View site", href: "https://constructora-six-theta.vercel.app" },
            { label: "View code", href: "https://github.com/AsherAST/constructora" },
          ],
        },
        {
          title: "Real-time Chat",
          description:
            "Room-based chat app with Socket.io: live messages with persistence, online user presence and a typing indicator. Custom Node server with custom JWT sessions.",
          stack: ["Next.js", "React", "TypeScript", "Socket.io", "Prisma", "PostgreSQL (Neon)", "JWT", "Tailwind CSS", "Vitest"],
          features: [
            "Authentication from scratch: bcrypt + JWT sessions (jose) in httpOnly cookies, also enforced on Socket.io connections",
            "Rooms with message history from the database and real-time delivery with acknowledgement (ack)",
            "Presence: online users per room, updated on join, leave or disconnect",
            "Live 'typing…' indicator with emission throttling",
            "33 unit tests and GitHub Actions CI",
          ],
          links: [
            { label: "View code", href: "https://github.com/AsherAST/chat" },
          ],
        },
      ],
    },
    contact: {
      title: "Contact",
      subtitle:
        "Have a project in mind or a job opportunity? Write to me and I'll get back to you as soon as possible.",
      form: {
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "you@email.com",
        message: "Message",
        messagePlaceholder: "Tell me about your project...",
        submit: "Send message",
        success: "Message sent! I'll get back to you soon.",
        error: "There was an error sending the message. Please try again.",
        errors: {
          name: "Please enter your name.",
          emailRequired: "Please enter your email address.",
          emailInvalid: "The email is not valid.",
          message: "Please enter your message.",
        },
      },
    },
    footer: {
      rights: "All rights reserved.",
      emailCopied: "Email copied!",
    },
  },
};

export default content;
