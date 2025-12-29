# Portfolio Website

A modern, full-stack portfolio website built with Next.js 14, Supabase, and deployed on Vercel.

## Features

### Public Site
- ✨ Modern design with glassmorphism and gradient effects
- 🌙 Dark mode optimized
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎨 Smooth animations and transitions
- 🔍 Project filtering by technology and category
- 📊 Skills showcase with proficiency levels
- 📬 Contact form with database storage

### Admin Panel
- 🔐 Secure authentication with Supabase
- 📝 Full CRUD operations for projects
- 💡 Skills management
- 📧 Contact form submissions viewer
- 👤 Profile management
- 📊 Dashboard with statistics
- ⭐ Featured projects toggle
- 👁️ Publish/Draft status

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **Deployment**: Vercel
- **Icons**: Lucide React

## Setup Instructions

### 1. Database Setup

1. Go to your Supabase project: https://nnffpynbcprfryolootq.supabase.co
2. Navigate to the SQL Editor
3. Run the SQL script from `database-schema.sql`
4. This will create all tables, RLS policies, and sample data

### 2. Create Admin User

In Supabase Dashboard:
1. Go to Authentication → Users
2. Click "Add user"
3. Enter your admin email and password
4. Confirm the user

### 3. Environment Variables

The `.env.local` file is already configured with:
```
NEXT_PUBLIC_SUPABASE_URL=https://nnffpynbcprfryolootq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_Fv_QEu0soY3Cu7YsxYkF2A_b-lFsDAF
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

Access admin panel at [http://localhost:3000/admin](http://localhost:3000/admin)

## Deployment to Vercel

### Option 1: Via GitHub (Recommended)

1. Push code to GitHub (instructions below)
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js
6. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Click "Deploy"

### Option 2: Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

## Git Setup

```bash
git init
git add .
git commit -m "Initial commit: Portfolio website"
git branch -M main
git remote add origin git@github.com:Frabbi727/mine_portfolio.git
git push -u origin main
```

## Customization

### Update Profile Information

1. Login to admin panel at `/admin`
2. Go to Profile section
3. Update your name, title, bio, email, and social links

### Add Projects

1. Go to Admin → Projects
2. Click "New Project"
3. Fill in project details
4. Toggle "Published" to make it visible on the site

### Add Skills

1. Go to Admin → Skills
2. Add your skills with categories and proficiency levels

### Customize Design

Edit `src/app/globals.css` to change:
- Color scheme (modify CSS variables)
- Fonts
- Animations

## Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── admin/          # Admin panel pages
│   │   ├── globals.css     # Global styles & design system
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   ├── components/
│   │   └── sections/       # Homepage sections
│   ├── lib/
│   │   └── supabase/       # Supabase client configs
│   └── types/              # TypeScript types
├── database-schema.sql     # Database setup script
└── README.md
```

## Admin Routes

- `/admin` - Dashboard
- `/admin/login` - Login page
- `/admin/projects` - Manage projects
- `/admin/skills` - Manage skills
- `/admin/contacts` - View messages
- `/admin/profile` - Edit profile

## Troubleshooting

### Can't login to admin panel
- Verify you created a user in Supabase Authentication
- Check environment variables are correct
- Clear cookies and try again

### Projects not showing on homepage
- Make sure projects are marked as "Published" in admin panel
- Check RLS policies are set up correctly in Supabase

### Build errors
- Run `npm run build` to check for TypeScript errors
- Ensure all required fields are filled in database

## Support

For issues or questions:
- Check Supabase documentation: https://supabase.com/docs
- Check Next.js documentation: https://nextjs.org/docs
- Vercel deployment docs: https://vercel.com/docs

## License

MIT
