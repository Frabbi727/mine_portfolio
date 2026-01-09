'use client'

import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Project } from '@/types/database'
import { ExternalLink, Github, Layers, Code } from 'lucide-react'

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([])
    const [selectedTech, setSelectedTech] = useState<string>('All')
    const [selectedCategory, setSelectedCategory] = useState<string>('All')
    const [loading, setLoading] = useState(true)

    const fetchProjects = async () => {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('is_published', true)
            .order('created_at', { ascending: false })

        if (data && !error) {
            setProjects(data)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const matchesTech = selectedTech === 'All' || project.technologies.includes(selectedTech)
            const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
            return matchesTech && matchesCategory
        })
    }, [projects, selectedTech, selectedCategory])

    const allTechnologies = Array.from(
        new Set(projects.flatMap(p => p.technologies))
    ).sort()

    const allCategories = Array.from(
        new Set(projects.map(p => p.category))
    ).sort()

    const hasFilters = allTechnologies.length > 0 || allCategories.length > 0

    return (
        <section id="projects" className="section-padding px-6">
            <div className="section-container">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4 reveal">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="text-text-secondary max-w-2xl mx-auto text-lg">
                        A collection of digital experiences I&apos;ve crafted across various technologies and domains.
                    </p>
                    <div className="w-20 h-1.5 gradient-bg mx-auto rounded-full"></div>
                </div>

                {/* Filters Interface */}
                {hasFilters && (
                    <div className="mb-16 space-y-8 reveal" style={{ animationDelay: '100ms' }}>
                        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                            {/* Tech Filter */}
                            <div className="flex flex-wrap justify-center gap-2 max-w-3xl">
                                <button
                                    onClick={() => setSelectedTech('All')}
                                    className={`glass-pill text-sm transition-all ${selectedTech === 'All'
                                            ? 'bg-primary text-white border-primary shadow-lg scale-105'
                                            : 'text-text-secondary hover:text-primary hover:border-primary/30'
                                        }`}
                                >
                                    All Tech
                                </button>
                                {allTechnologies.map(tech => (
                                    <button
                                        key={tech}
                                        onClick={() => setSelectedTech(tech)}
                                        className={`glass-pill text-sm transition-all ${selectedTech === tech
                                                ? 'bg-primary text-white border-primary shadow-lg scale-105'
                                                : 'text-text-secondary hover:text-primary hover:border-primary/30'
                                            }`}
                                    >
                                        {tech}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Projects Grid */}
                {loading ? (
                    <div className="text-center py-32 flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-text-secondary font-medium">Curating projects...</p>
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="text-center py-32 glass rounded-2xl">
                        <p className="text-text-secondary text-lg">No matches found for the selected filters.</p>
                        <button
                            onClick={() => { setSelectedTech('All'); setSelectedCategory('All'); }}
                            className="mt-4 text-primary font-semibold hover:underline"
                        >
                            Reset filters
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 reveal" style={{ animationDelay: '200ms' }}>
                        {filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="group relative glass overflow-hidden flex flex-col hover:border-primary/30 transition-all duration-500 hover:-translate-y-2"
                            >
                                {/* Image Wrapper */}
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    {project.image_url ? (
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                                            <Layers className="w-12 h-12 text-primary opacity-20" />
                                        </div>
                                    )}

                                    {/* Project Badges */}
                                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                                        <span className="glass-pill text-[10px] font-bold uppercase tracking-widest bg-gray-900/60 backdrop-blur-md">
                                            {project.category}
                                        </span>
                                        {project.is_featured && (
                                            <span className="px-3 py-1 bg-primary/90 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex-1 flex flex-col gap-4">
                                    <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack Chips */}
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.technologies.slice(0, 4).map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2.5 py-1 bg-gray-800/50 text-gray-400 text-[10px] font-semibold rounded-md border border-white/5"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 4 && (
                                            <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-semibold rounded-md border border-primary/20">
                                                +{project.technologies.length - 4}
                                            </span>
                                        )}
                                    </div>

                                    {/* Action Links */}
                                    <div className="flex gap-4 pt-4">
                                        {project.demo_url && (
                                            <a
                                                href={project.demo_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-primary !py-2.5 !px-5 text-sm flex-1"
                                            >
                                                <ExternalLink className="w-4 h-4 mr-2" />
                                                Live Demo
                                            </a>
                                        )}
                                        {project.github_url && (
                                            <a
                                                href={project.github_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-secondary !py-2.5 !px-5 text-sm flex-1"
                                            >
                                                <Github className="w-4 h-4 mr-2" />
                                                Source
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
