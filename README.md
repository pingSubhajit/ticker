# Ticker: Long duration stopwatch
A small tool for creating stopwatch timers that can run for days, months, or even years. All synced in real-time across 
multiple devices. Uses simple algorithm and seldom drifts by hardly one or two seconds.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## About

Built for personal usage, designed with personal preferences. The application is bare-featured with minimalistic design 
and functionality. Loads fast and animated appropriately. Mobile first design. No onboarding. No tracking. No ads, ever.

## Features
- Long-duration stopwatches
- Cloud-synced across devices
- Create, delete, and manage multiple stopwatches
- Access your stopwatches from anywhere
- Open source and free under the MIT license

## Installation

### Prerequisites

- Node.js (version ^20.12.2)
- npm (version ^10.5.0)
- A supabase account (free tier available)

### Steps

To run the development server, follow these steps:

1. **Clone the repository**
```bash
git clone https://github.com/pingSubhajit/ticker.git
```
2. **Install dependencies**
```bash
npm install
```
3. **Create a `.env` file in the root directory**
```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key
```
4. **Create Supabase table**

    Go to the Supabase dashboard and create a table named `timer` with the following columns:
- `id` (type: in8, primary key)
- `created_at` (type: timestampz, default: now())
- `name` (type: varchar, nullable: true)
- `started_at` (type: int8)
- `ended_at` (type: int8, nullable: true)
- `pauses` (type: json, nullable: true, array: true)
- `user` (type: uuid, default: auth.uid())

5. **Run the development server**
```bash
npm run dev
```

## Contributing

The product is free to use. However, no new features, bug fixes, or any meaningful support will be guaranteed. Although 
I welcome contributions and acknowledge that contributions are the building blocks of open-source software. If you want 
to contribute, please open an issue describing the problem or feature you want to work on. I will try to respond as soon
as possible. The project does not enforce any strict guidelines for contributions.


## License

Distributed under the MIT License. See [`LICENSE`](https://github.com/pingSubhajit/ticker/blob/main/LICENSE) for more
information. The project is completely open source and feel free to fork, modify and host your own version. 
No attribution required.