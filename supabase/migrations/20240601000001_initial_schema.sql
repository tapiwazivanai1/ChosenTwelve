-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  deadline TEXT NOT NULL,
  current_amount DECIMAL(10, 2) DEFAULT 0,
  target_amount DECIMAL(10, 2) NOT NULL,
  contributors INTEGER DEFAULT 0,
  category TEXT NOT NULL,
  image TEXT,
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users,
  name TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'member',
  status TEXT DEFAULT 'active',
  join_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create contributions table
CREATE TABLE IF NOT EXISTS contributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method TEXT NOT NULL,
  payment_status TEXT DEFAULT 'completed',
  transaction_reference TEXT,
  contributor_name TEXT,
  contributor_email TEXT,
  contributor_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create content_submissions table
CREATE TABLE IF NOT EXISTS content_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  content_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  rejection_reason TEXT,
  submitted_by_name TEXT,
  submitted_by_email TEXT,
  submission_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create content_submission_files table
CREATE TABLE IF NOT EXISTS content_submission_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES content_submissions(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_size TEXT,
  file_type TEXT,
  file_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  audience TEXT DEFAULT 'all',
  scheduled_date TIMESTAMP WITH TIME ZONE,
  sent_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create notification_recipients table
CREATE TABLE IF NOT EXISTS notification_recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_id UUID REFERENCES notifications(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_submission_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_recipients ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Projects policies
DROP POLICY IF EXISTS "Public read access for projects";
CREATE POLICY "Public read access for projects"
  ON projects FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admin full access for projects";
CREATE POLICY "Admin full access for projects"
  ON projects FOR ALL
  USING (auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  ));

-- Users policies
DROP POLICY IF EXISTS "Users can view their own profile";
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admin full access for users";
CREATE POLICY "Admin full access for users"
  ON users FOR ALL
  USING (auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  ));

-- Contributions policies
DROP POLICY IF EXISTS "Users can view their own contributions";
CREATE POLICY "Users can view their own contributions"
  ON contributions FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create contributions";
CREATE POLICY "Users can create contributions"
  ON contributions FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access for contributions";
CREATE POLICY "Admin full access for contributions"
  ON contributions FOR ALL
  USING (auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  ));

-- Content submissions policies
DROP POLICY IF EXISTS "Users can view their own submissions";
CREATE POLICY "Users can view their own submissions"
  ON content_submissions FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create submissions";
CREATE POLICY "Users can create submissions"
  ON content_submissions FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access for content submissions";
CREATE POLICY "Admin full access for content submissions"
  ON content_submissions FOR ALL
  USING (auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  ));

-- Content submission files policies
DROP POLICY IF EXISTS "Users can view submission files";
CREATE POLICY "Users can view submission files"
  ON content_submission_files FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can create submission files";
CREATE POLICY "Users can create submission files"
  ON content_submission_files FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access for submission files";
CREATE POLICY "Admin full access for submission files"
  ON content_submission_files FOR ALL
  USING (auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  ));

-- Notifications policies
DROP POLICY IF EXISTS "Users can view notifications";
CREATE POLICY "Users can view notifications"
  ON notifications FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admin full access for notifications";
CREATE POLICY "Admin full access for notifications"
  ON notifications FOR ALL
  USING (auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  ));

-- Notification recipients policies
DROP POLICY IF EXISTS "Users can view their notifications";
CREATE POLICY "Users can view their notifications"
  ON notification_recipients FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their notification status";
CREATE POLICY "Users can update their notification status"
  ON notification_recipients FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admin full access for notification recipients";
CREATE POLICY "Admin full access for notification recipients"
  ON notification_recipients FOR ALL
  USING (auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  ));

-- Enable realtime subscriptions
alter publication supabase_realtime add table projects;
alter publication supabase_realtime add table contributions;
alter publication supabase_realtime add table content_submissions;
alter publication supabase_realtime add table notifications;
alter publication supabase_realtime add table notification_recipients;
