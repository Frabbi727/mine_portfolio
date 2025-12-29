// Database Types for Supabase

export interface Project {
    id: string
    title: string
    description: string
    long_description?: string | null
    technologies: string[]
    category: string
    image_url?: string | null
    demo_url?: string | null
    github_url?: string | null
    is_featured: boolean
    is_published: boolean
    view_count: number
    created_at: string
    updated_at: string
}

export interface ProjectImage {
    id: string
    project_id: string
    image_url: string
    caption?: string | null
    order: number
    created_at: string
}

export interface Skill {
    id: string
    name: string
    category: string
    icon_url?: string | null
    proficiency: number
    order: number
    created_at: string
}

export interface ContactSubmission {
    id: string
    name: string
    email: string
    message: string
    is_read: boolean
    created_at: string
}

export interface Profile {
    id: string
    full_name: string
    title: string
    bio: string
    about_me?: string | null
    email: string
    github?: string | null
    linkedin?: string | null
    location?: string | null
    avatar_url?: string | null
    resume_url?: string | null
    updated_at: string
}
