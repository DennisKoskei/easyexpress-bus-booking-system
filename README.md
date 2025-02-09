# EasyExpress Coaches - Online Bus Ticket Booking System

## 🚀 Introduction

Welcome to **EasyExpress Coaches**, the ultimate online bus ticket booking system built with **Next.js 15**! This platform provides a seamless and hassle-free experience for users to search, book, and manage bus tickets online. Whether you're traveling for business or leisure, EasyExpress ensures a smooth and efficient booking process.

This project was built using the REACT fullstack framework [React.js 15](https://nextjs.org)

## 🎯 Features

- **🔎 Search**: Find bus routes, schedules, and prices easily.
- **🚌 Online Booking**: Securely book tickets with real-time availability.
- **💳 Multiple Payment Options**: Pay using mobile money, or online banking.
- **👤 User Accounts**: Create an account to view past bookings, manage preferences, and get exclusive offers.
- **📩 E-Ticketing**: Receive instant booking confirmations and e-tickets via email.
- **📝 Admin Dashboard**: Manage routes, schedules, bookings, and revenue insights.
- **📱 Mobile Responsive**: Fully optimized for mobile, tablet, and desktop users.

## 🏗️ Tech Stack

- **Frontend**: Next.js 15 (React Framework)
- **Backend**: (NextJs Backend Functionality)
- **Database**: PostgreSQL
- **Authentication**: NextAuth
- **Payment Gateway**: Mpesa
- **Hosting**: Vercel

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (Latest LTS version)
- npm or yarn
- PostgreSQL (Database setup required)

### Installation

Clone the repository and install dependencies:

```sh
 git clone https://github.com/DennisKoskei/easyexpress-bus-booking-system.git
 cd easyexpress-bus-booking-system
 npm install  # or yarn install
```

### Environment Variables

Create a `.env.local` file and add the following:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret
PAYMENT_GATEWAY_KEY=your_key
```

### Running the Application

Start the development server:

```sh
npm run dev  # or yarn dev
```

### Build for Production

```sh
npm run build && npm start
```

## 🛠️ API Endpoints

| Method | Endpoint          | Description          |
| ------ | ----------------- | -------------------- |
| GET    | /api/buses        | Fetch all buses      |
| GET    | /api/bookings     | Get user bookings    |
| POST   | /api/bookings     | Create a new booking |
| DELETE | /api/bookings/:id | Cancel a booking     |

## 🎨 UI/UX Design

- Modern, sleek, and intuitive design with Tailwind CSS
- Fast and responsive UI using Server Components

## 👨‍💻 Contributing

We welcome contributions! Feel free to open issues, submit PRs, or discuss ideas.

---

✨ **Book your journey with EasyExpress and travel smarter!**
