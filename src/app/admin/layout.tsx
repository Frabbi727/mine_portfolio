'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, FolderKanban, Lightbulb, Mail, User, LogOut } from 'lucide-react'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const supabase = createClient()

        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user)
            setLoading(false)
        })
    }, [])

    const handleLogout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/admin/login')
        router.refresh()
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 glass border-r border-card-border p-6 flex flex-col">
                {/* Logo */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">
                        <span className="gradient-text">Admin Panel</span>
                    </h1>
                    <p className="text-sm text-text-muted mt-1">{user?.email}</p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-2">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-hover-bg transition-smooth"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        <span>Dashboard</span>
                    </Link>

                    <Link
                        href="/admin/projects"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-hover-bg transition-smooth"
                    >
                        <FolderKanban className="w-5 h-5" />
                        <span>Projects</span>
                    </Link>

                    <Link
                        href="/admin/skills"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-hover-bg transition-smooth"
                    >
                        <Lightbulb className="w-5 h-5" />
                        <span>Skills</span>
                    </Link>

                    <Link
                        href="/admin/contacts"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-hover-bg transition-smooth"
                    >
                        <Mail className="w-5 h-5" />
                        <span>Messages</span>
                    </Link>

                    <Link
                        href="/admin/profile"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-hover-bg transition-smooth"
                    >
                        <User className="w-5 h-5" />
                        <span>Profile</span>
                    </Link>
                </nav>

                {/* Footer */}
                <div className="pt-6 border-t border-card-border space-y-2">
                    <Link
                        href="/"
                        className="block text-sm text-text-secondary hover:text-primary transition-smooth"
                    >
                        ← View Portfolio
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-smooth"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-auto">
                {children}
            </main>
        </div>
    )
}
