# Nexus Platform – Architecture Documentation

## What is Nexus?
Nexus is a web platform that connects Entrepreneurs and Investors.
Entrepreneurs can showcase their startups and find investors.
Investors can discover startups and send collaboration requests.

---

## Tech Stack
| Tool | Purpose |
|------|---------|
| React 18 | Building the UI |
| TypeScript | Adding type safety to JavaScript |
| Vite | Running and building the project |
| Tailwind CSS | Styling with utility classes |
| React Router v6 | Navigation between pages |
| FullCalendar | Meeting calendar |
| react-hot-toast | Notification popups |
| lucide-react | Icons |

---

## Folder Structure
src/
├── components/       # Reusable UI pieces
│   ├── layout/       # Navbar, Sidebar, DashboardLayout
│   ├── ui/           # Button, Card, Input, Badge, Avatar
│   ├── chat/         # Chat components
│   ├── collaboration/# Collaboration request components
│   ├── investor/     # Investor card component
│   └── entrepreneur/ # Entrepreneur card component
├── context/          # AuthContext (login/logout/user state)
├── data/             # Mock data (users, meetings, messages)
├── pages/            # All pages of the app
├── types/            # TypeScript interfaces/types
└── App.tsx           # Main file with all routes

---

## UI Theme
All colors, fonts and styles are defined in `tailwind.config.js`:
- **Primary** – Blue (main actions, buttons, active states)
- **Secondary** – Teal (supporting elements)
- **Accent** – Amber (highlights)
- **Success** – Green (confirmed/accepted states)
- **Warning** – Yellow (pending states)
- **Error** – Red (declined/error states)
- **Font** – Inter (clean, modern sans-serif)

---

## Auth Flow
1. User opens the app → redirected to `/login`
2. User logs in with email + role (Entrepreneur or Investor)
3. Auth state is saved in `localStorage`
4. `DashboardLayout` checks if user is logged in — if not, redirects to `/login`
5. Sidebar shows different menu items based on user role

---

## Data Layer
No real backend. All data is mocked in `src/data/`:
- `users.ts` – All entrepreneurs and investors
- `meetings.ts` – Meeting data with status (pending/confirmed/declined)
- `messages.ts` – Chat messages
- `collaborationRequests.ts` – Investor requests to entrepreneurs

---

## Routing
All pages are in `App.tsx`.
Public routes (no login needed):
- `/login`
- `/register`

Protected routes (login required, inside DashboardLayout):
- `/dashboard/entrepreneur`
- `/dashboard/investor`
- `/calendar`
- `/messages`
- `/documents`
- `/deals`
- and more...

---

## How to Run
```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build
```

---

## Responsive Design
The app is fully responsive:
- Mobile – single column layout
- Tablet – 2 column grid
- Desktop – 3-4 column grid, sidebar visible