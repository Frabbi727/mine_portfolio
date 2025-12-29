# Deployment Guide - Step by Step

Follow these steps exactly to deploy your portfolio:

## Step 1: Set Up Supabase Database (5 minutes)

### 1.1 Open Supabase SQL Editor
1. Open your browser and go to: https://supabase.com/dashboard/projects
2. Click on your project (the one with ID: nnffpynbcprfryolootq)
3. In the left sidebar, click on **SQL Editor**
4. Click **New Query** button (top right)

### 1.2 Run Database Schema
1. Open the file: `/Users/fazlerabbi/Desktop/Projects/portfolio/database-schema.sql`
2. Copy ALL the contents (Cmd+A, then Cmd+C)
3. Paste it into the SQL Editor in Supabase
4. Click **Run** button (bottom right)
5. Wait for "Success. No rows returned" message

✅ You should now have 5 tables: projects, project_images, skills, contact_submissions, profile

---

## Step 2: Create Admin User (2 minutes)

### 2.1 Navigate to Authentication
1. In Supabase dashboard, click **Authentication** in left sidebar
2. Click **Users** tab
3. Click **Add user** button (top right)

### 2.2 Create User
1. Choose **Create new user**
2. Enter your email (e.g., yourname@example.com)
3. Enter a strong password (remember this!)
4. Leave "Auto Confirm User" checked
5. Click **Create user**

✅ You now have admin access!

---

## Step 3: Deploy to Vercel (5 minutes)

### 3.1 Open Vercel
1. Go to: https://vercel.com
2. Click **Sign in** (or Sign up if you don't have an account)
3. Sign in with GitHub

### 3.2 Import Project
1. Click **Add New** → **Project**
2. Find **Frabbi727/mine_portfolio** in the list
3. Click **Import**

### 3.3 Configure Project
1. **Project Name**: Leave as is or customize
2. **Framework Preset**: Should auto-detect "Next.js"
3. **Root Directory**: Leave as "./"
4. **Build Command**: Leave as "npm run build"

### 3.4 Add Environment Variables
Click **Environment Variables** dropdown and add:

**Variable 1:**
- Name: `NEXT_PUBLIC_SUPABASE_URL`
- Value: `https://nnffpynbcprfryolootq.supabase.co`

**Variable 2:**
- Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
- Value: `sb_publishable_Fv_QEu0soY3Cu7YsxYkF2A_b-lFsDAF`

### 3.5 Deploy
1. Click **Deploy** button
2. Wait 2-3 minutes for build to complete
3. Click **Visit** to see your live site!

✅ Your portfolio is now live!

---

## Step 4: Test Everything

### 4.1 Test Public Site
Visit your Vercel URL (e.g., `https://mine-portfolio-xxxx.vercel.app`)

Check:
- ✅ Homepage loads
- ✅ All sections visible (Hero, About, Projects, Skills, Contact)
- ✅ Sample project appears (if database was set up correctly)
- ✅ Sample skills appear

### 4.2 Test Admin Panel
1. Go to: `https://your-vercel-url.vercel.app/admin`
2. Login with the email/password you created in Step 2
3. You should see the dashboard with stats
4. Navigate to Projects and try creating a new project

---

## Step 5: Add Your First Real Project

1. In admin panel, go to **Projects**
2. Click **New Project**
3. Fill in:
   - **Title**: Your project name
   - **Category**: Web App / Mobile / API / etc.
   - **Description**: Short summary (1-2 sentences)
   - **Technologies**: React, Next.js, etc. (comma-separated)
   - **Image URL**: Leave blank for now (or add a link to an image)
   - **Demo URL**: Link to live demo (optional)
   - **GitHub URL**: Link to repo (optional)
   - Check **Published** to make it visible
   - Check **Featured** to highlight it
4. Click **Create Project**
5. Go back to homepage to see your project!

---

## Troubleshooting

### Database errors?
- Make sure you ran the entire database-schema.sql file
- Check that all tables were created in Supabase Table Editor

### Can't login to admin?
- Verify you created a user in Supabase Authentication
- Check email/password match
- Try clearing cookies and logging in again

### Vercel build failed?
- Check that environment variables are exactly as shown above
- Make sure GitHub repo is public or Vercel has access
- Check build logs for specific errors

### Projects not showing?
- Make sure project is marked as "Published" in admin
- Check browser console for errors (F12)

---

## Quick Links

- **Your GitHub**: https://github.com/Frabbi727/mine_portfolio
- **Supabase Dashboard**: https://supabase.com/dashboard/project/nnffpynbcprfryolootq
- **Vercel Dashboard**: https://vercel.com/dashboard

---

## Next Steps After Deployment

1. **Customize Profile**
   - Update name, title, bio in Hero and About sections
   - Change email and social links in Contact section
   - Add your resume PDF

2. **Add Your Projects**
   - Delete the sample project
   - Add your real projects with screenshots

3. **Add Your Skills**
   - Add/edit skills in Supabase or create Skills admin page
   - Update categories and proficiency levels

4. **Custom Domain** (Optional)
   - In Vercel, go to Settings → Domains
   - Add your custom domain (requires DNS configuration)

---

**You're all set!** 🎉

After completing these steps, your portfolio will be live and you can manage it from the admin panel.
