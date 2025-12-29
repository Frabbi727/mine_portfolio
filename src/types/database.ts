export interface Project {
    id: string
    title: string
    description: string
    long_description?: string
    technologies: string[]
    category: string
    image_url: string
    demo_url?: string
    github_url?: string
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
    caption?: string
    order: number
}

export interface Skill {
    id: string
    name: string
    category: string
    icon_url?: string
    proficiency: number
    order: number
}

export interface ContactSubmission {
    id: string
    name: string
    email: string
    message: string
    created_at: string
    is_read: boolean
}

export interface Profile {
    id: string
    full_name: string
    title: string
    bio: string
    avatar_url?: string
    resume_url?: string
    email: string
    github?: string
    linkedin?: string
    location?: string
    updated_at: string
}
