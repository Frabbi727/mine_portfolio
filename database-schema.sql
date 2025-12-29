-- Portfolio Database Schema
-- Run this SQL in your Supabase SQL Editor

-- 1. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  category TEXT NOT NULL,
  image_url TEXT,
  demo_url TEXT,
  github_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Project Images Table
CREATE TABLE IF NOT EXISTS project_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  icon_url TEXT,
  proficiency INTEGER DEFAULT 50 CHECK (proficiency >= 0 AND proficiency <= 100),
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Contact Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Profile Table
CREATE TABLE IF NOT EXISTS profile (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT NOT NULL,
  avatar_url TEXT,
  resume_url TEXT,
  email TEXT NOT NULL,
  github TEXT,
  linkedin TEXT,
  location TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Projects (Read-only for public, full access for authenticated)
CREATE POLICY "Public can view published projects" 
  ON projects FOR SELECT 
  USING (is_published = true);

CREATE POLICY "Authenticated users can do everything with projects" 
  ON projects FOR ALL 
  USING (auth.role() = 'authenticated');

-- RLS Policies for Project Images
CREATE POLICY "Public can view project images" 
  ON project_images FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can manage project images" 
  ON project_images FOR ALL 
  USING (auth.role() = 'authenticated');

-- RLS Policies for Skills
CREATE POLICY "Public can view skills" 
  ON skills FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can manage skills" 
  ON skills FOR ALL 
  USING (auth.role() = 'authenticated');

-- RLS Policies for Contact Submissions
CREATE POLICY "Anyone can insert contact submissions" 
  ON contact_submissions FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact submissions" 
  ON contact_submissions FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update contact submissions" 
  ON contact_submissions FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete contact submissions" 
  ON contact_submissions FOR DELETE 
  USING (auth.role() = 'authenticated');

-- RLS Policies for Profile
CREATE POLICY "Public can view profile" 
  ON profile FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can manage profile" 
  ON profile FOR ALL 
  USING (auth.role() = 'authenticated');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON projects 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profile_updated_at 
  BEFORE UPDATE ON profile 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default profile (optional - customize this)
INSERT INTO profile (full_name, title, bio, email, location) 
VALUES (
  'Your Name',
  'Full Stack Developer',
  'Passionate about creating innovative web applications with modern technologies.',
  'your.email@example.com',
  'Your City, Country'
) ON CONFLICT DO NOTHING;

-- Sample data for testing (optional - remove in production)
-- Insert sample skills
INSERT INTO skills (name, category, proficiency, "order") VALUES
  ('React', 'Frontend Frameworks', 90, 1),
  ('Next.js', 'Frontend Frameworks', 85, 2),
  ('TypeScript', 'Languages', 85, 3),
  ('Node.js', 'Backend', 80, 4),
  ('PostgreSQL', 'Databases', 75, 5),
  ('Tailwind CSS', 'Styling', 90, 6)
ON CONFLICT DO NOTHING;

-- Insert sample project
INSERT INTO projects (
  title, 
  description, 
  long_description, 
  technologies, 
  category, 
  is_featured, 
  is_published
) VALUES (
  'Sample Portfolio Project',
  'A modern portfolio website built with Next.js and Supabase',
  'This is a full-stack portfolio website featuring a modern design with glassmorphism effects, dark mode, and admin panel for content management.',
  ARRAY['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
  'Web App',
  true,
  true
) ON CONFLICT DO NOTHING;
