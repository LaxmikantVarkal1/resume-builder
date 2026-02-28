# React Resume Builder 📄🚀

A modern, responsive, and privacy-first resume building application built with React, Vite, and Tailwind CSS. Create professional, ATS-friendly resumes purely in your browser and export them directly to PDF—no server required, no data stored.

## ✨ Features

- **Live Previews**: See your formatting changes in real-time on an A4 scaled canvas.
- **Multiple Templates**: Switch seamlessly between Classic and Modern structural layouts to fit your industry.
- **Responsive Canvas**: The true-to-life A4 preview smoothly scales to fit any screen size, complete with manual zoom controls (30% to 200%).
- **Mobile Friendly Workflows**: First-class mobile support with a floating action toggle to quickly switch between the editing form and your preview.
- **Accordion Forms**: Clean, distraction-free editing with collapsible form sections for Personal Info, Experience, Education, Projects, and Skills.
- **Local Storage Reliability**: Your resume data is automatically saved to your browser's local storage so you never lose your progress.
- **Native PDF Export**: Uses the browser's native print engine for pixel-perfect PDF rendering mapping strictly to A4 dimensions.

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Form Components**: Custom UI components based on Radix UI / shadcn concepts

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd resume-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The compiled assets will be available in the `dist` directory, ready to be deployed to any static host (Vercel, Netlify, GitHub Pages, etc.).

## 🖨️ Exporting to PDF

To export your completed resume:
1. Click the **Print** button in the top right of the preview pane.
2. In the system print dialog, set the `Destination` to **Save as PDF**.
3. Ensure the `Paper size` is set to **A4**.
4. Set `Margins` to **None** or **Default** (the app handles A4 margins automatically).
5. Enable `Background graphics` to preserve colors and template styles.

## 🔒 Privacy

This application is completely client-side. Your resume data is never sent to any external server. It is saved purely within your own browser's `localStorage` for your convenience.

---

*Built with ❤️ using React and Tailwind CSS.*
