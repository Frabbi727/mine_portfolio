'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Project } from '@/types/database'
import { ExternalLink, Github, Filter } from 'lucide-react'

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
        <section id="projects" className="min-h-screen px-4 py-20">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        My <span className="gradient-text">Projects</span>
                    </h2>
                    <div className="w-20 h-1 gradient-bg mx-auto rounded-full mb-6"></div>
                    <p className="text-text-secondary max-w-2xl mx-auto">
                        Here are some of my recent projects. Click on any project to learn more.
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-12 space-y-6">
                    {/* Technology Filter */}
                    {allTechnologies.length > 0 && (
                        <div className="glass p-6 rounded-2xl">
                            <div className="flex items-center gap-2 mb-4">
                                <Filter className="w-5 h-5 text-primary" />
                                <h3 className="font-semibold">Filter by Technology</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setSelectedTech('All')}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${selectedTech === 'All'
                                            ? 'gradient-bg text-white shadow-lg shadow-primary/30'
                                            : 'glass hover:bg-hover-bg'
                                        }`}
                                >
                                    All
                                </button>
                                {allTechnologies.map(tech => (
                                    <button
                                        key={tech}
                                        onClick={() => setSelectedTech(tech)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${selectedTech === tech
                                                ? 'gradient-bg text-white shadow-lg shadow-primary/30'
                                                : 'glass hover:bg-hover-bg'
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
                        <div className="glass p-6 rounded-2xl">
                            <div className="flex items-center gap-2 mb-4">
                                <Filter className="w-5 h-5 text-accent" />
                                <h3 className="font-semibold">Filter by Category</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setSelectedCategory('All')}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${selectedCategory === 'All'
                                            ? 'gradient-bg text-white shadow-lg shadow-accent/30'
                                            : 'glass hover:bg-hover-bg'
                                        }`}
                                >
                                    All
                                </button>
                                {allCategories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${selectedCategory === category
                                                ? 'gradient-bg text-white shadow-lg shadow-accent/30'
                                                : 'glass hover:bg-hover-bg'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

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
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className="glass p-6 rounded-2xl hover:scale-105 transition-smooth cursor-pointer group"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Project Image */}
                                <div className="relative mb-4 rounded-xl overflow-hidden aspect-video bg-gradient-to-br from-primary/20 to-accent/20">
                                    {project.image_url ? (
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-4xl font-bold gradient-text">
                                            {project.title.charAt(0)}
                                        </div>
                                    )}

                                    {/* Featured Badge */}
                                    {project.is_featured && (
                                        <div className="absolute top-3 right-3 px-3 py-1 gradient-bg text-white text-xs font-bold rounded-full">
                                            Featured
                                        </div>
                                    )}
                                </div>

                                {/* Category */}
                                <div className="text-sm text-primary font-semibold mb-2">
                                    {project.category}
                                </div>

                                {/* Project Title */}
                                <h3 className="text-xl font-bold mb-2 text-text-primary">
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p className="text-text-secondary mb-4 line-clamp-2">
                                    {project.description}
                                </p>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.slice(0, 3).map((tech, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 3 && (
                                        <span className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">
                                            +{project.technologies.length - 3}
                                        </span>
                                    )}
                                </div>

                                {/* Links */}
                                <div className="flex gap-3">
                                    {project.demo_url && (
                                        <a
                                            href={project.demo_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 gradient-bg text-white rounded-lg hover:scale-105 transition-smooth text-sm font-medium"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Demo
                                        </a>
                                    )}
                                    {project.github_url && (
                                        <a
                                            href={project.github_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 glass hover:bg-hover-bg rounded-lg hover:scale-105 transition-smooth text-sm font-medium"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Github className="w-4 h-4" />
                                            Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
