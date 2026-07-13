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
| FullCalendar | Meeting scheduling calendar |
| react-hot-toast | Notification popups |
| lucide-react | Icons |
| date-fns | Date formatting |
| react-dropzone | File uploads |

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
├── data/             # Mock data (users, meetings, messages, payments)
├── pages/            # All pages of the app
│   ├── auth/         # Login, Register
│   ├── dashboard/    # Entrepreneur & Investor dashboards
│   ├── calendar/     # Meeting calendar
│   ├── video/        # Video call UI
│   ├── documents/    # Document chamber
│   ├── payments/     # Payment section
│   ├── chat/         # Chat/messages
│   ├── profile/      # User profiles
│   ├── deals/        # Deals page
│   ├── settings/     # Settings
│   ├── notifications/# Notifications
│   └── help/         # Help & support
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
2. User selects role (Entrepreneur or Investor) and enters credentials
3. After successful login → 2FA OTP screen appears (mock)
4. User enters any 6 digits → redirected to their dashboard
5. Auth state is saved in `localStorage`
6. `DashboardLayout` checks if user is logged in — if not, redirects to `/login`
7. Sidebar shows different menu items based on user role

---

## Security Features
- **Password strength meter** — shows Weak/Medium/Strong on Register page
- **2FA OTP mockup** — 6-digit code screen after login (mock, any 6 digits accepted)
- **Role-based UI** — Entrepreneur and Investor see different dashboards, sidebar items and stats

---

## Data Layer
No real backend. All data is mocked in `src/data/`:
- `users.ts` – All entrepreneurs and investors
- `meetings.ts` – Meeting data with status (pending/confirmed/declined) and availability slots
- `messages.ts` – Chat messages
- `collaborationRequests.ts` – Investor requests to entrepreneurs
- `payments.ts` – Wallet balances and transaction history

---

## New Features (Phase 2)

### Meeting Calendar
- Built with FullCalendar
- Add/modify availability slots
- Send, accept, decline meeting requests
- Confirmed meetings shown on dashboard
- Color coded: Blue = confirmed, Yellow = pending, Red = declined, Teal = available

### Video Call
- Mock video call UI
- Start/End call buttons
- Audio and video toggle
- Screen share toggle
- Local video preview (avatar)

### Document Chamber
- Upload PDF/doc files
- Preview documents
- E-signature mockup (type name as signature)
- Status labels: Draft, In Review, Signed

### Payments
- Wallet balance display
- Deposit, Withdraw, Transfer simulation
- Fund Deal flow (Investor to Entrepreneur)
- Transaction history table
- Wallet balance shown on both dashboards

### Guided Tour
- Custom step-by-step walkthrough on first login
- 4 steps covering Dashboard, Calendar, Payments, Messages
- Stored in localStorage so it only shows once

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
- `/video`
- `/payments`
- `/messages`
- `/documents`
- `/deals`
- `/notifications`
- `/settings`
- `/help`
- `/chat/:userId`
- `/profile/entrepreneur/:id`
- `/profile/investor/:id`

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
- Mobile – single column layout, hamburger menu with all navigation items
- Tablet – 2 column grid
- Desktop – 3-4 column grid, sidebar visible