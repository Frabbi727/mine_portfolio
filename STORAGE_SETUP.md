# Supabase Storage Setup Guide

## Step 1: Create Storage Bucket

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/nnffpynbcprfryolootq
2. Click **"Storage"** in the left sidebar
3. Click **"Create a new bucket"** button
4. Enter:
   - **Name**: `portfolio`
   - **Public bucket**: ✓ Check this box (so images are publicly accessible)
5. Click **"Create bucket"**

---

## Step 2: Set Up Bucket Policies

After creating the bucket, we need to allow uploads:

1. Click on the `portfolio` bucket you just created
2. Click **"Policies"** tab
3. Click **"New Policy"**
4. Choose **"Custom policy"**

### Policy 1: Allow Public Read
```
Policy name: Public Read Access
Allowed operation: SELECT
Target roles: public
Policy definition: true
```

### Policy 2: Allow Authenticated Upload
```
Policy name: Authenticated Upload
Allowed operation: INSERT
Target roles: authenticated
Policy definition: true
```

### Policy 3: Allow Authenticated Delete
```
Policy name: Authenticated Delete
Allowed operation: DELETE
Target roles: authenticated
Policy definition: true
```

---

## Step 3: Test the Upload

1. Go to your admin panel: https://mine-portfolio-nu.vercel.app/admin/profile
2. Scroll to "Media & Documents" section
3. You should now see:
   - **Profile Avatar** with upload button
   - **Resume / CV** with upload button
4. Click "Upload Image" and select a photo
5. Wait for upload to complete
6. Your avatar will appear in the preview!

---

## Alternative: Quick SQL Setup

If you prefer, run this SQL in Supabase SQL Editor to set up policies automatically:

```sql
-- Create storage bucket (if not exists)
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict do nothing;

-- Allow public to view files
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'portfolio' );

-- Allow authenticated users to upload files
create policy "Authenticated users can upload files"
on storage.objects for insert
with check ( bucket_id = 'portfolio' AND auth.role() = 'authenticated' );

-- Allow authenticated users to delete their files
create policy "Authenticated users can delete files"
on storage.objects for delete
using ( bucket_id = 'portfolio' AND auth.role() = 'authenticated' );
```

---

##  What Happens After Upload?

1. File is uploaded to `portfolio/avatars/` or `portfolio/documents/`
2. A public URL is generated automatically
3. The URL is saved to your profile in the database
4. Your homepage instantly shows the new avatar/resume link!

---

## Troubleshooting

**"Failed to upload file" error?**
- Make sure bucket is created with name `portfolio`
- Make sure bucket is set to **Public**
- Check that policies are created correctly

**Upload button not showing?**
- Wait for Vercel deployment to complete
- Refresh the admin page
- Check browser console for errors

**Files upload but don't show?**
- Make sure bucket is set to Public
- Check the Public Read policy is enabled

---

Let me know when you've created the bucket and I'll help you test the upload! 🚀
