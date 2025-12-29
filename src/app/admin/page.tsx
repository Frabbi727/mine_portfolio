'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { FolderKanban, Lightbulb, Mail, Eye } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalProjects: 0,
        publishedProjects: 0,
        totalSkills: 0,
        unreadMessages: 0,
        totalViews: 0,
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        const supabase = createClient()

        const [projects, skills, messages] = await Promise.all([
            supabase.from('projects').select('is_published, view_count'),
            supabase.from('skills').select('id'),
            supabase.from('contact_submissions').select('is_read'),
        ])

        const totalProjects = projects.data?.length || 0
        const publishedProjects = projects.data?.filter(p => p.is_published).length || 0
        const totalViews = projects.data?.reduce((acc, p) => acc + (p.view_count || 0), 0) || 0
        const totalSkills = skills.data?.length || 0
        const unreadMessages = messages.data?.filter(m => !m.is_read).length || 0

        setStats({
            totalProjects,
            publishedProjects,
            totalSkills,
            unreadMessages,
            totalViews,
        })
        setLoading(false)
    }

    const statCards = [
        {
            label: 'Total Projects',
            value: stats.totalProjects,
            subtext: `${stats.publishedProjects} published`,
            icon: FolderKanban,
            color: 'from-primary to-accent',
            href: '/admin/projects',
        },
        {
            label: 'Total Skills',
            value: stats.totalSkills,
            subtext: 'Across categories',
            icon: Lightbulb,
            color: 'from-accent to-primary',
            href: '/admin/skills',
        },
        {
            label: 'Unread Messages',
            value: stats.unreadMessages,
            subtext: 'New contacts',
            icon: Mail,
            color: 'from-primary to-accent',
            href: '/admin/contacts',
        },
        {
            label: 'Total Views',
            value: stats.totalViews,
            subtext: 'Project impressions',
            icon: Eye,
            color: 'from-accent to-primary',
        },
    ]

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    Dashboard <span className="gradient-text">Overview</span>
                </h1>
                <p className="text-text-secondary">
                    Welcome to your portfolio admin panel
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon
                    const CardWrapper = stat.href ? Link : 'div'

                    return (
                        <CardWrapper
                            key={index}
                            href={stat.href || ''}
                            className={`glass p-6 rounded-2xl hover:scale-105 transition-smooth ${stat.href ? 'cursor-pointer' : ''}`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                            <p className="text-sm text-text-secondary mb-1">{stat.label}</p>
                            <p className="text-xs text-text-muted">{stat.subtext}</p>
                        </CardWrapper>
                    )
                })}
            </div>

            {/* Quick Actions */}
            <div className="glass p-6 rounded-2xl">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link
                        href="/admin/projects"
                        className="px-6 py-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium transition-smooth text-center"
                    >
                        + New Project
                    </Link>
                    <Link
                        href="/admin/skills"
                        className="px-6 py-4 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg font-medium transition-smooth text-center"
                    >
                        + Add Skill
                    </Link>
                    <Link
                        href="/admin/profile"
                        className="px-6 py-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium transition-smooth text-center"
                    >
                        Edit Profile
                    </Link>
                    <Link
                        href="/"
                        target="_blank"
                        className="px-6 py-4 glass hover:bg-hover-bg rounded-lg font-medium transition-smooth text-center"
                    >
                        View Site →
                    </Link>
                </div>
            </div>
        </div>
    )
}
