# SplitWiser - Smart Expense Splitting App

SplitWiser is a modern web application that helps friends, roommates, and groups split expenses effortlessly. Built with Next.js, Convex, and Clerk authentication, it provides a seamless experience for tracking shared expenses and settling balances.

## 🚀 Features

### Core Functionality
- **Group Expenses Management**: Create and manage groups for roommates, trips, or events
- **Smart Settlements**: Intelligent algorithm that minimizes transactions for efficient settling
- **Multiple Split Types**: Split bills equally, by percentage, or assign exact amounts
- **Real-time Updates**: Instant updates when friends add expenses or settle balances
- **Expense Analytics**: Visualize spending habits with detailed analytics and charts
- **Payment Reminders**: Timely reminders for pending payments and settlements

### User Experience
- **Modern UI**: Beautiful, responsive design built with Tailwind CSS and Radix UI
- **Authentication**: Secure user authentication powered by Clerk
- **Real-time Sync**: Live updates across all devices using Convex
- **Mobile Responsive**: Optimized for all screen sizes

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with custom components
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: Convex for real-time data synchronization
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization

### Backend
- **Database**: Convex (serverless database with real-time capabilities)
- **Authentication**: Clerk for user management and JWT authentication
- **Background Jobs**: Inngest for scheduled tasks and reminders
- **Email**: Resend for transactional emails
- **AI Integration**: Google Generative AI for smart insights

### Key Technologies
```json
{
  "frontend": ["Next.js", "React 19", "Tailwind CSS", "Radix UI"],
  "backend": ["Convex", "Clerk", "Inngest", "Resend"],
  "ai": ["Google Generative AI"],
  "charts": ["Recharts"]
}
```

## 📁 Project Structure

```
splitwiser/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── sign-in/             # Sign in pages
│   │   └── sign-up/             # Sign up pages
│   ├── (main)/                  # Main application routes
│   │   ├── dashboard/           # Dashboard with analytics
│   │   ├── expenses/            # Expense management
│   │   ├── contacts/            # User contacts and groups
│   │   ├── groups/              # Group management
│   │   ├── settlements/         # Settlement tracking
│   │   └── person/              # Individual user pages
│   └── api/                     # API routes
├── components/                   # Reusable UI components
│   ├── ui/                      # Base UI components (Radix)
│   └── *.jsx                    # Feature-specific components
├── convex/                      # Backend functions and schema
│   ├── schema.js                # Database schema definition
│   ├── users.js                 # User management functions
│   ├── expenses.js              # Expense CRUD operations
│   ├── groups.js                # Group management
│   ├── settlements.js           # Settlement tracking
│   ├── dashboard.js             # Dashboard analytics
│   └── contacts.js              # Contact management
├── lib/                         # Utility functions
│   ├── expense-categories.js    # Expense category definitions
│   ├── inngest/                 # Background job functions
│   └── utils.js                 # General utilities
└── hooks/                       # Custom React hooks
```

## 🗄️ Database Schema

### Core Tables

#### Users
```javascript
{
  name: string,
  email: string,
  tokenIdentifier: string,
  imageUrl: optional(string)
}
```

#### Expenses
```javascript
{
  description: string,
  amount: number,
  category: optional(string),
  date: number, // timestamp
  paidByUserId: id("users"),
  splitType: string, // "equal", "percentage", "exact"
  splits: array({
    userId: id("users"),
    amount: number,
    paid: boolean
  }),
  groupId: optional(id("groups")),
  createdBy: id("users")
}
```

#### Groups
```javascript
{
  name: string,
  description: optional(string),
  createdBy: id("users"),
  members: array({
    userId: id("users"),
    role: string, // "admin" or "member"
    joinedAt: number
  })
}
```

#### Settlements
```javascript
{
  amount: number,
  note: optional(string),
  date: number, // timestamp
  paidByUserId: id("users"),
  receivedByUserId: id("users"),
  groupId: optional(id("groups")),
  relatedExpenseIds: optional(array(id("expenses"))),
  createdBy: id("users")
}
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Convex account
- Clerk account
- Resend account (for emails)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd splitwiser
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with the following variables:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   CLERK_JWT_ISSUER_DOMAIN=your_clerk_jwt_issuer_domain

   # Convex
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   CONVEX_DEPLOY_KEY=your_convex_deploy_key

   # Resend (for emails)
   RESEND_API_KEY=your_resend_api_key

   # Google AI (optional)
   GOOGLE_AI_API_KEY=your_google_ai_key

   # Inngest (for background jobs)
   INNGEST_EVENT_KEY=your_inngest_event_key
   INNGEST_SIGNING_KEY=your_inngest_signing_key
   ```

4. **Setup Convex**
   ```bash
   npx convex dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🚀 Deployment

### Vercel Deployment
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Convex Deployment
```bash
npx convex deploy
```

## 📊 Key Features Explained

### Smart Settlement Algorithm
The app uses an intelligent debt simplification algorithm that:
- Calculates pair-wise balances between all group members
- Reduces circular debts automatically
- Minimizes the number of transactions needed to settle up
- Provides optimal settlement suggestions

### Real-time Synchronization
- All data updates are reflected instantly across all connected clients
- Uses Convex's real-time capabilities for live collaboration
- No manual refresh needed for expense updates

### Expense Categories
Comprehensive categorization system with 20+ categories:
- Food & Drink, Coffee, Groceries
- Travel, Transportation, Housing
- Entertainment, Utilities, Health
- And many more with custom icons

### Analytics Dashboard
- Monthly spending trends
- Total balance tracking
- Group-wise expense breakdown
- Visual charts and graphs

## 🔐 Security Features

- **Authentication**: Secure JWT-based authentication with Clerk
- **Authorization**: Role-based access control for groups
- **Data Validation**: Server-side validation with Convex
- **Protected Routes**: Middleware protection for all sensitive routes
- **Input Sanitization**: Proper validation and sanitization of all inputs

## 🧪 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Structure
- **Components**: Reusable UI components in `/components`
- **Pages**: Route components in `/app`
- **Backend**: Convex functions in `/convex`
- **Utilities**: Helper functions in `/lib`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Clerk** for authentication
- **Convex** for the real-time database
- **Radix UI** for accessible components
- **Tailwind CSS** for styling
- **Next.js** for the framework

## 📞 Support

For support, email support@splitwiser.com or create an issue in the repository.

---

**SplitWiser** - Making expense splitting simple, smart, and stress-free! 💚