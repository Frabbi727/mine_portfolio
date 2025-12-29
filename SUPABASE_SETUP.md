# Supabase Setup Guide - Complete Instructions

## What You Need to Do

You need to create the database tables in Supabase. Follow these exact steps:

---

## Step 1: Open Supabase SQL Editor

1. **Open your browser** and go to: https://supabase.com/dashboard/sign-in
2. **Sign in** to your Supabase account
3. You should see your project **nnffpynbcprfryolootq** in the project list
4. **Click on it** to open the project
5. In the **left sidebar**, find and click **"SQL Editor"** (looks like a document icon)
6. Click the **"New Query"** button (usually top right or a + button)

---

## Step 2: Copy the SQL Code

**Option A: Copy from file**
1. Open the file: `/Users/fazlerabbi/Desktop/Projects/portfolio/database-schema.sql`
2. Press **Cmd+A** to select all
3. Press **Cmd+C** to copy

**Option B: Copy from terminal**
Run this command in your terminal:
```bash
cat /Users/fazlerabbi/Desktop/Projects/portfolio/database-schema.sql | pbcopy
```
This copies the SQL to your clipboard automatically.

---

## Step 3: Paste and Run

1. Go back to the **Supabase SQL Editor** (the query you opened in Step 1)
2. **Click inside the query text area** (the big empty space)
3. Press **Cmd+V** to paste all the SQL code
4. You should see a long SQL script (about 187 lines)
5. Click the **"Run"** button (usually bottom right corner)
6. **Wait 5-10 seconds** for it to complete

---

## Step 4: Verify Database Was Created

After running the SQL, verify it worked:

1. In Supabase, click **"Table Editor"** in the left sidebar
2. You should now see **5 tables**:
   - ✅ **projects** (with 1 sample project)
   - ✅ **project_images** (empty)
   - ✅ **skills** (with 6 sample skills)
   - ✅ **contact_submissions** (empty)
   - ✅ **profile** (with 1 default profile)

If you see these tables, **SUCCESS!** ✅

---

## Step 5: Create Your Admin Account

Now create your login account:

1. Still in Supabase, click **"Authentication"** in the left sidebar
2. Click the **"Users"** tab
3. Click **"Add user"** button (top right)
4. Select **"Create new user"**
5. Enter:
   - **Email**: your email address (e.g., fazlerabbi@example.com)
   - **Password**: choose a strong password (remember this!)
   - Keep **"Auto Confirm User"** checked ✓
6. Click **"Create user"**

**Save your login credentials!**
- Email: ___________________
- Password: ___________________

---

## Step 6: Test Your Live Site

1. Open: https://mine-portfolio-nu.vercel.app
2. You should see:
   - ✅ Homepage with Hero section
   - ✅ About section
   - ✅ **1 sample project** in Projects section
   - ✅ **6 sample skills** in Skills section
   - ✅ Contact form

3. Test admin login:
   - Go to: https://mine-portfolio-nu.vercel.app/admin
   - Login with the email/password you just created
   - You should see the admin dashboard

---

## Troubleshooting

### SQL Editor shows errors?
**Common issue**: Policy already exists
- This is OK if you've run the script before
- The tables will still be created
- Check Table Editor to verify tables exist

### Can't find SQL Editor?
- Look for an icon that looks like `</>` or a document
- It might be labeled "SQL" or "SQL Editor"
- Try the top menu or left sidebar

### Tables not showing up?
- Refresh the Table Editor page
- Make sure the SQL query showed "Success" message
- Try running the SQL again (it's safe to run multiple times)

### Can't login to admin?
- Make sure you created the user in Authentication → Users
- Use the exact email/password you entered
- Try clearing browser cookies

---

## What's Next?

After completing these steps:

1. **Add your first project** in the admin panel
2. **Update your profile** information (name, email, etc.)
3. **Customize skills** to match your actual skills
4. **Delete the sample data** and add your real content

---

## Need Help?

If you get stuck:
1. Take a screenshot of any error messages
2. Check what you see in Table Editor
3. Let me know where you're stuck and I'll help!

---

**Start with Step 1 above and let me know when you complete each step!** 🚀
