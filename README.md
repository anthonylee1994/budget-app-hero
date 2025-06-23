# Budget App Hero 💰

A modern, responsive budget management application built with cutting-edge web technologies. Take control of your finances with intelligent tracking, beautiful visualizations, and intuitive user experience.

## ✨ Features

- **💳 Transaction Management** - Track income and expenses with detailed categorization
- **📊 Visual Analytics** - Interactive charts and graphs for spending insights
- **🏷️ Smart Categories** - Flexible categorization system with custom icons and colors
- **📱 Responsive Design** - Seamless experience across desktop, tablet, and mobile
- **🎨 Modern UI** - Beautiful interface with smooth animations and 3D effects
- **🔐 Secure Authentication** - User accounts with profile management
- **📈 Dashboard Overview** - Comprehensive financial summary at a glance
- **🌙 Dark Mode Support** - Toggle between light and dark themes

## 🚀 Technologies Used

- **[Vite](https://vitejs.dev/guide/)** - Lightning-fast build tool
- **[React 18](https://react.dev/)** - Modern React with hooks and TypeScript
- **[HeroUI](https://heroui.com)** - Beautiful UI component library
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion)** - Smooth animations and 3D effects
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe development
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **[Chart.js](https://www.chartjs.org/)** - Interactive data visualizations
- **[React Router](https://reactrouter.com/)** - Client-side routing

## 🛠️ Installation

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Clone the repository

```bash
git clone https://github.com/frontio-ai/budget-app-hero.git
cd budget-app-hero
```

### Install dependencies

Choose your preferred package manager:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install

# Using bun
bun install
```

### Setup pnpm (if using pnpm)

Add the following to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@heroui/*
```

Then run `pnpm install` again.

## 🏃‍♂️ Development

### Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── categories/     # Category management
│   ├── common/         # Shared components
│   ├── dashboard/      # Dashboard widgets
│   ├── landing/        # Landing page components
│   └── transactions/   # Transaction components
├── pages/              # Application pages
├── stores/             # Zustand state stores
├── types/              # TypeScript type definitions
├── utils/              # Helper functions
└── styles/             # Global styles
```

## 🎨 Key Features Showcase

### 3D Interactive Elements

- Cursor-following 3D card effects on desktop
- Smooth animations with Framer Motion
- Responsive fallbacks for mobile devices

### Advanced Data Visualization

- Donut charts for expense/income breakdown
- Trend analysis with bar charts
- Real-time financial summaries

### Modern UI/UX

- Glassmorphism design elements
- Smooth micro-interactions
- Intuitive navigation and user flows

## 🌐 Deployment

This project is configured for easy deployment on platforms like:

- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- Any static hosting service

Build the project:

```bash
npm run build
```

The `dist` folder will contain the production-ready files.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Licensed under the [MIT license](LICENSE).

## 🙏 Acknowledgments

- Built with [HeroUI](https://heroui.com) component library
- Icons provided by [Iconify](https://iconify.design/)
- Animations powered by [Framer Motion](https://www.framer.com/motion)

---

**Start managing your finances like a hero! 🦸‍♂️💰**
