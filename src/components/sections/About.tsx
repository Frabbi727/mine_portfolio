'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Profile } from '@/types/database'
import { Download } from 'lucide-react'

export default function About() {
    const [profile, setProfile] = useState<Profile | null>(null)

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        const supabase = createClient()
        const { data } = await supabase
            .from('profile')
            .select('*')
            .single()

        if (data) {
            setProfile(data)
        }
    }

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <section id="about" className="min-h-screen flex items-center justify-center px-4 py-20">
            <div className="max-w-6xl mx-auto w-full">
                <div className="glass p-8 md:p-12">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            About <span className="gradient-text">Me</span>
                        </h2>
                        <div className="w-20 h-1 gradient-bg mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Image Side */}
                        <div className="order-2 md:order-1">
                            <div className="relative">
                                <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-primary to-accent p-1">
                                    {profile?.avatar_url ? (
                                        <img
                                            src={profile.avatar_url}
                                            alt={profile.full_name}
                                            className="w-full h-full rounded-2xl object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                                            <div className="text-8xl font-bold gradient-text">
                                                {profile ? getInitials(profile.full_name) : 'YN'}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
                                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="order-1 md:order-2 space-y-6">
                            <h3 className="text-2xl md:text-3xl font-bold text-text-primary">
                                {profile?.full_name || 'Your Name'}
                            </h3>

                            <p className="text-lg text-primary font-semibold mb-2">
                                {profile?.title || 'Full Stack Developer'}
                            </p>

                            <p className="text-text-secondary leading-relaxed text-base">
                                {profile?.about_me || profile?.bio || 'With a passion for creating innovative web applications, I specialize in building scalable and user-friendly solutions using modern technologies.'}
                            </p>

                            {profile?.location && (
                                <p className="text-text-secondary leading-relaxed">
                                    📍 Based in {profile.location}
                                </p>
                            )}

                            {/* Download Resume */}
                            {profile?.resume_url && (
                                <div className="pt-4">
                                    <a
                                        href={profile.resume_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 px-8 py-4 gradient-bg text-white font-semibold rounded-full hover:scale-105 transition-smooth shadow-lg shadow-primary/40"
                                    >
                                        <Download className="w-5 h-5" />
                                        Download Resume
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
