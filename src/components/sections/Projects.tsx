'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Project } from '@/types/database'
import { ExternalLink, Github, Sparkles, Code2, FolderKanban } from 'lucide-react'

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([])
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
    const [selectedTech, setSelectedTech] = useState<string>('All')
    const [selectedCategory, setSelectedCategory] = useState<string>('All')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProjects()
    }, [])

    useEffect(() => {
        filterProjects()
    }, [selectedTech, selectedCategory, projects])

    const fetchProjects = async () => {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('is_published', true)
            .order('created_at', { ascending: false })

        if (data && !error) {
            setProjects(data)
            setFilteredProjects(data)
        }
        setLoading(false)
    }

    const filterProjects = () => {
        let filtered = projects

        if (selectedTech !== 'All') {
            filtered = filtered.filter(project =>
                project.technologies.includes(selectedTech)
            )
        }

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(project =>
                project.category === selectedCategory
            )
        }

        setFilteredProjects(filtered)
    }

    // Get all unique technologies
    const allTechnologies = Array.from(
        new Set(projects.flatMap(p => p.technologies))
    ).sort()

    // Get all unique categories
    const allCategories = Array.from(
        new Set(projects.map(p => p.category))
    ).sort()

    return (
        <section id="projects" className="min-h-screen px-6 py-24">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        My <span className="gradient-text">Projects</span>
                    </h2>
                    <div className="w-20 h-1 gradient-bg mx-auto rounded-full mb-6"></div>
                    <p className="text-text-secondary max-w-2xl mx-auto text-lg">
                        Here are some of my recent projects. Click on any project to learn more.
                    </p>
                </div>

                {/* Filters - Professional Design */}
                {(allTechnologies.length > 0 || allCategories.length > 0) && (
                    <div className="mb-16">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Technology Filter */}
                            {allTechnologies.length > 0 && (
                                <div className="glass p-8 rounded-2xl border border-white/10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20">
                                            <Code2 className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg">Technology</h3>
                                            <p className="text-xs text-text-muted">Filter by tech stack</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => setSelectedTech('All')}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedTech === 'All'
                                                    ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/30'
                                                    : 'bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white border border-white/10'
                                                }`}
                                        >
                                            All
                                        </button>
                                        {allTechnologies.map(tech => (
                                            <button
                                                key={tech}
                                                onClick={() => setSelectedTech(tech)}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedTech === tech
                                                        ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/30'
                                                        : 'bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white border border-white/10'
                                                    }`}
                                            >
                                                {tech}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Category Filter */}
                            {allCategories.length > 0 && (
                                <div className="glass p-8 rounded-2xl border border-white/10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center border border-accent/20">
                                            <FolderKanban className="w-5 h-5 text-accent" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg">Category</h3>
                                            <p className="text-xs text-text-muted">Filter by project type</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap- 2">
                                        <button
                                            onClick={() => setSelectedCategory('All')}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === 'All'
                                                    ? 'bg-gradient-to-r from-accent to-accent/80 text-white shadow-lg shadow-accent/30'
                                                    : 'bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white border border-white/10'
                                                }`}
                                        >
                                            All
                                        </button>
                                        {allCategories.map(category => (
                                            <button
                                                key={category}
                                                onClick={() => setSelectedCategory(category)}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === category
                                                        ? 'bg-gradient-to-r from-accent to-accent/80 text-white shadow-lg shadow-accent/30'
                                                        : 'bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white border border-white/10'
                                                    }`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Projects Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-text-secondary">Loading projects...</p>
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-text-secondary text-lg">No projects found. Try different filters.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className="glass rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer group border border-white/5"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Project Image */}
                                <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                                    {project.image_url ? (
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="text-7xl font-bold gradient-text">
                                                {project.title.charAt(0)}
                                            </span>
                                        </div>
                                    )}

                                    {/* Featured Badge */}
                                    {project.is_featured && (
                                        <div className="absolute top-4 right-4 px-4 py-1.5 gradient-bg text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5">
                                            <Sparkles className="w-3.5 h-3.5" />
                                            Featured
                                        </div>
                                    )}
                                </div>

                                {/* Project Content */}
                                <div className="p-6 space-y-4">
                                    {/* Category */}
                                    <div className="text-sm text-primary font-semibold uppercase tracking-wide">
                                        {project.category}
                                    </div>

                                    {/* Project Title */}
                                    <h3 className="text-xl font-bold text-white line-clamp-1">
                                        {project.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-text-secondary text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]">
                                        {project.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.slice(0, 3).map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full border border-accent/20">
                                                +{project.technologies.length - 3} more
                                            </span>
                                        )}
                                    </div>

                                    {/* Links */}
                                    <div className="flex gap-3 pt-2">
                                        {project.demo_url && (
                                            <a
                                                href={project.demo_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 gradient-bg text-white rounded-lg hover:scale-105 transition-all text-sm font-semibold shadow-lg shadow-primary/20"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                Live Demo
                                            </a>
                                        )}
                                        {project.github_url && (
                                            <a
                                                href={project.github_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg hover:scale-105 transition-all text-sm font-semibold border border-white/10"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Github className="w-4 h-4" />
                                                Code
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
