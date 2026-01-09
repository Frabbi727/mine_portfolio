'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Skill } from '@/types/database'
import { Cpu, Code2, Globe, Database, Smartphone, Layout } from 'lucide-react'

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

    // Map categories to icons
    const getCategoryIcon = (category: string) => {
        const cat = category.toLowerCase()
        if (cat.includes('front')) return <Layout className="w-6 h-6" />
        if (cat.includes('back')) return <Database className="w-6 h-6" />
        if (cat.includes('mobile')) return <Smartphone className="w-6 h-6" />
        if (cat.includes('cloud') || cat.includes('devops')) return <Globe className="w-6 h-6" />
        if (cat.includes('language')) return <Code2 className="w-6 h-6" />
        return <Cpu className="w-6 h-6" />
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
        <section id="skills" className="section-padding px-6">
            <div className="section-container">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4 reveal">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Expertise & <span className="gradient-text">Technologies</span>
                    </h2>
                    <p className="text-text-secondary max-w-2xl mx-auto text-lg">
                        The technical stack and professional tools I leverage to build exceptional digital solutions.
                    </p>
                    <div className="w-20 h-1.5 gradient-bg mx-auto rounded-full"></div>
                </div>

                {/* Skills Grid */}
                {loading ? (
                    <div className="text-center py-32 flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-text-secondary font-medium">Loading stack...</p>
                    </div>
                ) : Object.keys(groupedSkills).length === 0 ? (
                    <div className="glass p-16 text-center rounded-2xl">
                        <p className="text-text-secondary text-lg">
                            Skills haven&apos;t been added yet. Update via the admin panel.
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8 reveal" style={{ animationDelay: '200ms' }}>
                        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                            <div key={category} className="glass p-8 md:p-10 relative overflow-hidden group">
                                {/* Category Header */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-primary/10 rounded-xl text-primary border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                                        {getCategoryIcon(category)}
                                    </div>
                                    <h3 className="text-2xl font-bold tracking-tight text-text-primary">
                                        {category}
                                    </h3>
                                </div>

                                {/* Skills in Category */}
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {categorySkills.map((skill, index) => (
                                        <div
                                            key={skill.id}
                                            className="space-y-3"
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center gap-3">
                                                    {skill.icon_url ? (
                                                        <img
                                                            src={skill.icon_url}
                                                            alt={skill.name}
                                                            className="w-5 h-5 object-contain opacity-80"
                                                        />
                                                    ) : (
                                                        <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]"></div>
                                                    )}
                                                    <span className="font-semibold text-text-secondary text-sm group-hover:text-text-primary transition-colors">
                                                        {skill.name}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] font-bold text-primary tracking-widest opacity-60">
                                                    {skill.proficiency}%
                                                </span>
                                            </div>

                                            {/* Proficiency Bar */}
                                            <div className="w-full bg-gray-800/50 rounded-full h-1.5 overflow-hidden border border-white/5">
                                                <div
                                                    className="gradient-bg h-full rounded-full relative"
                                                    style={{ width: `${skill.proficiency}%` }}
                                                >
                                                    {/* Glow effect on the tip */}
                                                    <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/20 blur-sm"></div>
                                                </div>
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
