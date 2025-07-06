import { Bell, CreditCard, PieChart, Receipt, Users } from "lucide-react";

export const FEATURES = [
  {
    title: "Group Expenses",
    Icon: Users,
    bg: "bg-green-100",
    color: "text-green-600",
    description:
      "Create and manage groups for roommates, trips, or events to keep shared expenses organized and transparent.",
  },
  {
    title: "Smart Settlements",
    Icon: CreditCard,
    bg: "bg-teal-100",
    color: "text-teal-600",
    description:
      "Our intelligent algorithm minimizes the number of transactions, making settling up simple and efficient.",
  },
  {
    title: "Expense Analytics",
    Icon: PieChart,
    bg: "bg-green-100",
    color: "text-green-600",
    description:
      "Visualize your spending habits and gain insights into where your money goes with detailed analytics.",
  },
  {
    title: "Payment Reminders",
    Icon: Bell,
    bg: "bg-amber-100",
    color: "text-amber-600",
    description:
      "Get timely reminders for pending payments and never miss a settlement deadline again.",
  },
  {
    title: "Multiple Split Types",
    Icon: Receipt,
    bg: "bg-green-100",
    color: "text-green-600",
    description:
      "Split bills equally, by percentage, or assign exact amounts—customized for any scenario.",
  },
  {
    title: "Real‑time Updates",
    Icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M9 14v8M15 14v8M9 2v6M15 2v6" />
      </svg>
    ),
    bg: "bg-teal-100",
    color: "text-teal-600",
    description:
      "Receive instant updates when friends add expenses or settle balances—no more manual tracking.",
  },
];

export const STEPS = [
  {
    label: "1",
    title: "Create or Join a Group",
    description:
      "Start a group for roommates, a trip, or an event and easily invite others to join.",
  },
  {
    label: "2",
    title: "Add Expenses",
    description:
      "Log who paid, for what, and how it should be split among group members.",
  },
  {
    label: "3",
    title: "Settle Up",
    description:
      "Track who owes what, and log payments to keep everything up to date.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Splitwiser has completely transformed how our team manages shared expenses during business trips. It’s seamless, accurate, and keeps everything transparent.",
    name: "Anita Desai",
    image: "/testimonials/anita.jpg",
    role: "Operations Manager, NexaCorp",
  },
  {
    quote:
      "As someone who travels often with friends, Splitwiser takes away all the awkwardness of tracking and settling expenses. A must-have app!",
    name: "Rahul Mehta",
    image: "/testimonials/rahul.jpg",
    role: "Travel Blogger",
  },
  {
    quote:
      "Managing shared expenses in my flatshare used to be chaotic. With Splitwiser, it's organized, fair, and super easy. We love it!",
    name: "Sarah Thompson",
    image: "/testimonials/sarah.jpg",
    role: "Graduate Student, University of Edinburgh",
  },
];
