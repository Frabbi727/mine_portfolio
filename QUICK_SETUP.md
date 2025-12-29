# Quick Setup Checklist

## ✅ What You Have
- Supabase URL: https://nnffpynbcprfryolootq.supabase.co
- Supabase Key: sb_publishable_Fv_QEu0soY3Cu7YsxYkF2A_b-lFsDAF
- Vercel Site: https://mine-portfolio-nu.vercel.app
- GitHub Repo: Connected ✓

## 🔧 What You Need to Do Now

### Step 1: Check Vercel Environment Variables (2 minutes)

1. Go to: https://vercel.com/frabbi727/mine-portfolio-nu/settings/environment-variables
2. Check if you see these two variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**If they're MISSING:**
1. Click "Add New"
2. Add Variable 1:
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://nnffpynbcprfryolootq.supabase.co`
   - Environment: Production, Preview, Development (check all)
3. Add Variable 2:
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: `sb_publishable_Fv_QEu0soY3Cu7YsxYkF2A_b-lFsDAF`
   - Environment: Production, Preview, Development (check all)
4. Go to Deployments tab and click "Redeploy"

---

### Step 2: Set Up Database (5 minutes)

**Option A - Quick Copy (Recommended):**

Run this in your terminal:
```bash
cat /Users/fazlerabbi/Desktop/Projects/portfolio/database-schema.sql | pbcopy
```
Then:
1. Go to: https://supabase.com/dashboard/project/nnffpynbcprfryolootq/editor
2. Click "SQL Editor" in sidebar
3. Click "New query"
4. Press Cmd+V to paste
5. Click "Run"

**Option B - Manual:**
1. Open file: `/Users/fazlerabbi/Desktop/Projects/portfolio/database-schema.sql`
2. Copy all contents (Cmd+A, Cmd+C)
3. Go to Supabase SQL Editor
4. Paste and Run

**You should see:** "Success. No rows returned" or success message

---

### Step 3: Verify Database Tables

After running SQL:
1. In Supabase, click "Table Editor" in sidebar
2. You should see 5 tables created:
   - ✅ projects (1 sample row)
   - ✅ skills (6 sample rows)
   - ✅ profile (1 row)
   - ✅ contact_submissions (empty)
   - ✅ project_images (empty)

---

### Step 4: Create Admin Account

1. In Supabase, click "Authentication" → "Users"
2. Click "Add user"
3. Enter:
   - Email: (your email)
   - Password: (choose a strong password)
   - Keep "Auto Confirm User" checked
4. Click "Create user"

**Save your credentials:**
- Email: ____________________
- Password: ____________________

---

### Step 5: Test Everything

1. **Visit your site:** https://mine-portfolio-nu.vercel.app
   - You should see sample project and skills

2. **Test admin login:** https://mine-portfolio-nu.vercel.app/admin
   - Login with credentials from Step 4
   - You should see the dashboard

---

## ❓ Troubleshooting

**Site loads but no projects/skills showing?**
- Database not set up yet → Do Step 2

**Can't login to admin?**
- No admin user created → Do Step 4
- Wrong credentials → Check email/password

**"Failed to fetch" errors?**
- Environment variables missing → Do Step 1 and redeploy

---

## 📝 Next Steps After Setup

1. Login to admin panel
2. Go to Projects → Delete sample project
3. Create your first real project
4. Update your name/info in the code
5. Add your real skills

---

**Complete the steps above and let me know if you hit any issues!** 🚀
