# GEMINI.md - Project Context & Instructions

## Project Overview
**Calcutta Chaat & Bakery** is a high-performance, visually rich web application for an authentic Bengali street food restaurant. It leverages a modern React stack with deep AI integrations to provide a seamless customer experience for ordering, catering planning, and general inquiries.

### Core Technologies
- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS 4.
- **Animations:** GSAP (with ScrollTrigger), Framer Motion (Motion), Lenis (smooth scrolling).
- **Backend/API:** Express (local development), Vercel Edge Functions (production).
- **Database & Auth:** Firebase (Authentication, Cloud Firestore).
- **AI:** Google Gemini API (`gemini-2.0-flash`) via `@google/genai`.

---

## Project Structure
- `src/`: Main application source.
  - `components/`: Reusable UI components (Hero, Navbar, Chatbot, etc.).
  - `pages/`: Page-level components (Home, Order, Catering, About, Contact).
  - `contexts/`: Global state management (Authentication).
  - `data/`: Static assets and configuration (Menu items).
- `api/`: Serverless edge functions (Vercel).
- `server/`: Local Express server for order management.
- `public/`: Static assets (images, ornaments, and branding).

---

## Building and Running

### Development
To start the full development environment (Frontend + Local Server):
```bash
npm run dev:full
```
- **Frontend:** `http://localhost:3000`
- **Server:** `http://localhost:4000`

### Other Commands
- `npm run dev`: Start only the Vite development server.
- `npm run server`: Start only the local Express server.
- `npm run build`: Create a production build in the `dist/` directory.
- `npm run lint`: Run TypeScript type checking.

---

## Development Conventions

### 1. Component Architecture
- Prefer functional components with TypeScript interfaces for props.
- Keep UI components in `src/components` and route-level components in `src/pages`.
- Utilize **Framer Motion** for micro-interactions and **GSAP** for complex scroll-based animations.

### 2. State Management
- Use `AuthContext` for user session and profile data.
- Use local `useState` or `sessionStorage` for transient data (like cart or chat history).

### 3. AI & Safety
- **Prompt Engineering:** Chatbots use specialized `SYSTEM_PROMPT`s located in `FloatingChatbot.tsx` and `CateringConcierge.tsx`.
- **Security:** Always use `preFilter` and `postValidate` functions for AI interactions to prevent prompt injection and ensure culinary focus.
- **Widgets:** The Catering Concierge uses an `ACTION:` protocol to trigger React UI widgets from AI responses.

### 4. Styling
- Use **Tailwind CSS 4** utility classes.
- Respect the brand color palette defined in `tailwind.config.ts` (e.g., `brand-orange`, `brand-navy`, `brand-yellow`).

### 5. API Interactions
- Orders should be sent to `/api/orders`.
- The `api/orders.ts` handler manages both local and production environments via Edge Runtime compatibility.

---

## Key Workflows
- **Menu Updates:** Modify `src/data/menu.ts` to update prices, descriptions, or categories globally.
- **Catering Quotes:** The `CateringConcierge` handles lead generation; review `BookingModal` for form logic and deposit calculations.
- **Authentication:** `AuthContext` manages the Firebase flow; the login modal is triggered globally via the `login` function.
