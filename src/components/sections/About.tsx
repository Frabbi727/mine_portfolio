'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Profile } from '@/types/database'
import { Download, MapPin } from 'lucide-react'

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
        <section id="about" className="section-padding px-6">
            <div className="section-container">
                <div className="glass p-8 md:p-16 relative overflow-hidden">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

                    <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
                        {/* Image Side */}
                        <div className="lg:col-span-5 order-2 lg:order-1">
                            <div className="relative">
                                {/* Main Image Frame */}
                                <div className="relative z-10 aspect-square rounded-2xl overflow-hidden gradient-border">
                                    {profile?.avatar_url ? (
                                        <img
                                            src={profile.avatar_url}
                                            alt={profile.full_name}
                                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                                            <div className="text-8xl font-bold gradient-text opacity-50">
                                                {profile ? getInitials(profile.full_name) : 'YN'}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Floating Experience Badge (Optional - if we had years) */}
                                <div className="absolute -bottom-6 -right-6 glass-pill py-4 px-6 shadow-xl hidden md:block">
                                    <p className="text-sm font-medium text-text-secondary">Focused on</p>
                                    <p className="text-xl font-bold gradient-text">Modern Web</p>
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                                    About <span className="gradient-text">Me</span>
                                </h2>
                                <div className="w-20 h-1.5 gradient-bg rounded-full"></div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-2xl font-semibold text-text-primary">
                                    I&apos;m {profile?.full_name || 'Your Name'}, a developer based in {profile?.location || 'Your Location'}
                                </h3>

                                <p className="text-lg text-text-secondary leading-relaxed text-balance">
                                    {profile?.about_me || profile?.bio || 'With a passion for creating innovative web applications, I specialize in building scalable and user-friendly solutions using modern technologies.'}
                                </p>

                                {profile?.location && (
                                    <div className="flex items-center gap-2 text-primary font-medium">
                                        <MapPin className="w-5 h-5" />
                                        <span>Currently in {profile.location}</span>
                                    </div>
                                )}
                            </div>

                            {/* CTAs */}
                            <div className="pt-4 flex flex-wrap gap-4">
                                {profile?.resume_url && (
                                    <a
                                        href={profile.resume_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary btn-lg px-8"
                                    >
                                        <Download className="w-5 h-5 mr-2" />
                                        Download Resume
                                    </a>
                                )}
                                <a
                                    href="#contact"
                                    className="btn btn-secondary btn-lg px-8"
                                >
                                    Let&apos;s Talk
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
