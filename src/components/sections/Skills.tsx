'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Skill } from '@/types/database'

export default function Skills() {
    const [skills, setSkills] = useState<Skill[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchSkills()
    }, [])

    const fetchSkills = async () => {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('skills')
            .select('*')
            .order('order', { ascending: true })

        if (data && !error) {
            setSkills(data)
        }
        setLoading(false)
    }

    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = []
        }
        acc[skill.category].push(skill)
        return acc
    }, {} as Record<string, Skill[]>)

    return (
        <section id="skills" className="min-h-screen px-4 py-20">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Skills & <span className="gradient-text">Technologies</span>
                    </h2>
                    <div className="w-20 h-1 gradient-bg mx-auto rounded-full mb-6"></div>
                    <p className="text-text-secondary max-w-2xl mx-auto">
                        Technologies and tools I work with to bring ideas to life.
                    </p>
                </div>

                {/* Skills Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-text-secondary">Loading skills...</p>
                    </div>
                ) : Object.keys(groupedSkills).length === 0 ? (
                    <div className="glass p-12 rounded-2xl">
                        <p className="text-text-secondary text-center">
                            No skills added yet. Add skills from the admin panel.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                            <div key={category} className="glass p-8 rounded-2xl">
                                <h3 className="text-2xl font-bold mb-6 gradient-text">
                                    {category}
                                </h3>
                                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {categorySkills.map((skill, index) => (
                                        <div
                                            key={skill.id}
                                            className="fade-in"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            <div className="flex items-center gap-4 mb-2">
                                                {skill.icon_url ? (
                                                    <img
                                                        src={skill.icon_url}
                                                        alt={skill.name}
                                                        className="w-8 h-8"
                                                    />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                                                        {skill.name.charAt(0)}
                                                    </div>
                                                )}
                                                <span className="font-semibold text-text-primary">
                                                    {skill.name}
                                                </span>
                                            </div>

                                            {/* Proficiency Bar */}
                                            <div className="w-full bg-card-bg rounded-full h-2 overflow-hidden">
                                                <div
                                                    className="gradient-bg h-full rounded-full transition-smooth"
                                                    style={{ width: `${skill.proficiency}%` }}
                                                ></div>
                                            </div>
                                            <div className="text-right text-xs text-text-muted mt-1">
                                                {skill.proficiency}%
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
