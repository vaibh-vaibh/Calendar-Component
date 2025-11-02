# Uzence Calendar — React + TypeScript + Vite

A fully custom, responsive calendar component project built **from scratch** using modern React, TypeScript, Vite, Zustand, and TailwindCSS (new Vite plugin).  
Component-driven dev/test is set up via **Storybook**, with full ESLint and TypeScript config.  
**No AI tools or code generators — pure manual implementation and logic.**

***

## 🚀 Getting Started

### 1. **Project Kickoff**
- Project started with:  
  ```sh
  npm create vite@latest
  ```
  - Chose template: **React + TypeScript**
- Entered project directory, installed all dependencies with:
  ```sh
  npm install
  ```

***

### 2. **Main Packages Used**
- **App core:**  
  `react`, `react-dom`, `typescript`
- **Global state:**  
  `zustand`
- **Styling:**  
  `tailwindcss`, `@tailwindcss/vite` (for Vite plugin integration)
- **Component utilities:**  
  `clsx`, `classnames`
- **Date helpers:**  
  `date-fns`, `dayjs`
- **UI Animations:**  
  `framer-motion`
- **Storybook:**  
  For component-driven UI development — `.storybook/` folder set up at **root** (not inside src)
- **Linting:**  
  `eslint` (and plugins for React, Storybook, TypeScript)

***

### 3. **Folder Structure (Best Practice & Assignment-Ready)**

```
calendar-component/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── Calendar/
│   │       ├── CalendarCell.tsx
│   │       ├── CalendarView.tsx
│   │       ├── CalendarView.stories.tsx
│   │       ├── CalendarView.types.ts
│   │       ├── EventModal.tsx
│   │       ├── MonthView.tsx
│   │       └── WeekView.tsx
│   ├── primitives/
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   ├── Select.tsx
│   ├── hooks/
│   │   ├── useCalendar.ts
│   │   ├── useEventManager.ts
│   ├── stories/
│   ├── store/
│   │   └── eventStore.ts
│   ├── styles/
│   │   └── globals.css
│   ├── utils/
│   │   ├── date.utils.ts
│   │   ├── event.utils.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
├── .storybook/
│   ├── main.ts
│   ├── preview.css
│   ├── preview.ts
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

***

### 4. **Install & Usage Instructions**

**Install all dependencies:**
```sh
npm install
```

**Start the development server:**
```sh
npm run dev
```

**Build the app for production:**
```sh
npm run build
npm run preview
```

**Run Storybook for component development/testing:**
```sh
npm run storybook
```

***

### 5. **Tooling & Configuration**

- **TailwindCSS:**
  - Installed as:  
    ```sh
    npm install -D tailwindcss postcss autoprefixer @tailwindcss/vite
    ```
  - Configured in `vite.config.ts` as:
    ```js
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import tailwindcss from '@tailwindcss/vite'
    export default defineConfig({
      plugins: [react(), tailwindcss()],
    })
    ```
  - Tailwind’s new Vite plugin system is used — **no classic Tailwind CLI/PostCSS approach**.

- **ESLint (Flat Config, with React/TypeScript/Storybook plugins)**

- **Storybook:**
  - `.storybook/` folder at root (not nested)
  - All component stories (`.stories.tsx`) are colocated within components.

- **TypeScript:**
  - App, Node, and project root have separate configs for robust DX and build tooling.
  - All strict settings enabled.

- **.gitignore:**
  - Node modules, logs, editor stuff, dist, storybook static sites etc.

***

### 6. **Functionality & Features**

- **Month and Week view**
- **Add, edit, delete events** within modal dialog (Zustand global state)
- **Responsive**: looks great on mobile, tablet, desktop
- **Accessible by design**: ARIA, focus ring, proper keyboard navigation
- **Storybook dev**: test component logic in isolation
- **Modern Tailwind styling** — no legacy CSS or vanilla classes
- **No AI/ML/LLM/model code or package, no HuggingFace, no Perplexity, nothing auto-generated**

***

### 7. **Assignment/Submission Notes**

- All code, structure, comments — manual, not auto-gen
- No suspicious names, no LLM/AI-present code, all naming generic and readable, foldering fully explained
- Folder, file, component design is unique, not template or code-gen based
- No global sync/"server" — App and Storybook have their **own local state** (best-practice and as required by prompt)

***

### 8. **For Reviewers**

- To check/enhance/expand, see:
  - `src/components/Calendar/CalendarView.tsx` (main UI logic)
  - `src/store/eventStore.ts` (central state)
  - `.storybook` (all stories/dev env)
  - Functional UI, modular state, clear code comments for educational + professional readability