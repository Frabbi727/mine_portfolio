'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Project } from '@/types/database'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'

export default function ProjectsAdmin() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingProject, setEditingProject] = useState<Project | null>(null)

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        const supabase = createClient()
        const { data } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false })

        if (data) {
            setProjects(data)
        }
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return

        const supabase = createClient()
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id)

        if (!error) {
            fetchProjects()
        }
    }

    const togglePublished = async (project: Project) => {
        const supabase = createClient()
        const { error } = await supabase
            .from('projects')
            .update({ is_published: !project.is_published })
            .eq('id', project.id)

        if (!error) {
            fetchProjects()
        }
    }

    const toggleFeatured = async (project: Project) => {
        const supabase = createClient()
        const { error } = await supabase
            .from('projects')
            .update({ is_featured: !project.is_featured })
            .eq('id', project.id)

        if (!error) {
            fetchProjects()
        }
    }

    if (loading) {
        return <div className="flex items-center justify-center h-96">
            <div className="w-12 h-12 border4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    }

    if (showForm || editingProject) {
        return <ProjectForm
            project={editingProject}
            onClose={() => {
                setShowForm(false)
                setEditingProject(null)
                fetchProjects()
            }}
        />
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        <span className="gradient-text">Projects</span>
                    </h1>
                    <p className="text-text-secondary">Manage your portfolio projects</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="px-6 py-3 gradient-bg text-white font-semibold rounded-lg hover:scale-105 transition-smooth shadow-lg shadow-primary/30 flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    New Project
                </button>
            </div>

            {projects.length === 0 ? (
                <div className="glass p-12 rounded-2xl text-center">
                    <p className="text-text-secondary mb-4">No projects yet</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-6 py-3 gradient-bg text-white font-semibold rounded-lg hover:scale-105 transition-smooth"
                    >
                        Create First Project
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {projects.map((project) => (
                        <div key={project.id} className="glass p-6 rounded-2xl">
                            <div className="flex gap-6">
                                <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex-shrink-0 overflow-hidden">
                                    {project.image_url ? (
                                        <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-3xl font-bold gradient-text">
                                            {project.title.charAt(0)}
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                                            <p className="text-sm text-primary mb-2">{project.category}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => togglePublished(project)}
                                                className={`p-2 rounded-lg transition-smooth ${project.is_published ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}
                                                title={project.is_published ? 'Published' : 'Draft'}
                                            >
                                                {project.is_published ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                                            </button>
                                            <button
                                                onClick={() => toggleFeatured(project)}
                                                className={`px-3 py-2 rounded-lg text-sm transition-smooth ${project.is_featured ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'}`}
                                            >
                                                {project.is_featured ? '⭐ Featured' : 'Feature'}
                                            </button>
                                        </div>
                                    </div>

                                    <p className="text-text-secondary mb-3 line-clamp-2">{project.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-4 items-center">
                                        <div className="flex gap-2">
                                            {project.demo_url && (
                                                <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                                                    Demo →
                                                </a>
                                            )}
                                            {project.github_url && (
                                                <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">
                                                    GitHub →
                                                </a>
                                            )}
                                        </div>
                                        <div className="flex-1"></div>
                                        <button
                                            onClick={() => setEditingProject(project)}
                                            className="p-2 glass hover:bg-hover-bg rounded-lg transition-smooth"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-smooth"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

function ProjectForm({ project, onClose }: { project: Project | null, onClose: () => void }) {
    const [formData, setFormData] = useState({
        title: project?.title || '',
        description: project?.description || '',
        long_description: project?.long_description || '',
        category: project?.category || '',
        image_url: project?.image_url || '',
        demo_url: project?.demo_url || '',
        github_url: project?.github_url || '',
        technologies: project?.technologies.join(', ') || '',
        is_featured: project?.is_featured || false,
        is_published: project?.is_published || false,
    })
    const [saving, setSaving] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        const supabase = createClient()
        const projectData = {
            ...formData,
            technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
        }

        let error
        if (project) {
            const result = await supabase
                .from('projects')
                .update(projectData)
                .eq('id', project.id)
            error = result.error
        } else {
            const result = await supabase
                .from('projects')
                .insert([projectData])
            error = result.error
        }

        if (!error) {
            onClose()
        }
        setSaving(false)
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    <span className="gradient-text">{project ? 'Edit' : 'New'} Project</span>
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Title *</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg focus:outline-none focus:border-primary transition-smooth"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Category *</label>
                        <input
                            type="text"
                            required
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            placeholder="e.g., Web App, Mobile, API"
                            className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg focus:outline-none focus:border-primary transition-smooth"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Short Description *</label>
                    <textarea
                        required
                        rows={2}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg focus:outline-none focus:border-primary transition-smooth resize-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Long Description</label>
                    <textarea
                        rows={4}
                        value={formData.long_description}
                        onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                        className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg focus:outline-none focus:border-primary transition-smooth resize-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Technologies (comma-separated) *</label>
                    <input
                        type="text"
                        required
                        value={formData.technologies}
                        onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                        placeholder="React, Next.js, TypeScript, Supabase"
                        className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg focus:outline-none focus:border-primary transition-smooth"
                    />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Image URL</label>
                        <input
                            type="url"
                            value={formData.image_url}
                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                            className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg focus:outline-none focus:border-primary transition-smooth"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Demo URL</label>
                        <input
                            type="url"
                            value={formData.demo_url}
                            onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                            className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg focus:outline-none focus:border-primary transition-smooth"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">GitHub URL</label>
                        <input
                            type="url"
                            value={formData.github_url}
                            onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                            className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg focus:outline-none focus:border-primary transition-smooth"
                        />
                    </div>
                </div>

                <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.is_featured}
                            onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                            className="w-5 h-5 rounded border-card-border"
                        />
                        <span className="text-sm">Featured Project</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.is_published}
                            onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                            className="w-5 h-5 rounded border-card-border"
                        />
                        <span className="text-sm">Published</span>
                    </label>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-3 gradient-bg text-white font-semibold rounded-lg hover:scale-105 transition-smooth shadow-lg shadow-primary/30 disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 glass hover:bg-hover-bg font-semibold rounded-lg transition-smooth"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
