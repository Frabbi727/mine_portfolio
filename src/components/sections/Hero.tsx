'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Profile } from '@/types/database'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'

export default function Hero() {
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

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    // Get initials from name
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 py-20">
            {/* Animated background gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-10 text-center max-w-5xl mx-auto fade-in">
                {/* Profile Image - Larger and more prominent */}
                <div className="mb-10 inline-block">
                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-full glass p-1.5 mx-auto hover:scale-105 transition-smooth">
                        {profile?.avatar_url ? (
                            <img
                                src={profile.avatar_url}
                                alt={profile.full_name}
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-5xl md:text-6xl font-bold text-white">
                                {profile ? getInitials(profile.full_name) : 'YN'}
                            </div>
                        )}
                    </div>
                </div>

                {/* Greeting - More subtle */}
                <div className="mb-6">
                    <h2 className="text-sm md:text-base text-text-muted uppercase tracking-widest font-medium">
                        Hi there! I&apos;m
                    </h2>
                </div>

                {/* Name - Better line height */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight px-4">
                    <span className="gradient-text block">{profile?.full_name || 'Your Name'}</span>
                </h1>

                {/* Title - Consistent sizing  */}
                <p className="text-xl sm:text-2xl md:text-3xl font-semibold mb-8 text-white/90">
                    {profile?.title || 'Full Stack Developer'}
                </p>

                {/* Tagline - Better readability */}
                <p className="text-base md:text-lg text-text-secondary max-w-3xl mx-auto mb-14 leading-relaxed px-6">
                    {profile?.bio || 'I build innovative web applications with modern technologies. Passionate about creating seamless user experiences and scalable solutions.'}
                </p>

                {/* CTA Buttons - Improved styling and spacing */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 px-4">
                    <button
                        onClick={() => scrollToSection('projects')}
                        className="w-full sm:w-auto min-w-[200px] px-10 py-4 gradient-bg text-white font-semibold rounded-full hover:scale-105 transition-smooth shadow-lg shadow-primary/40 text-base"
                    >
                        View My Work
                    </button>
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="w-full sm:w-auto min-w-[200px] px-10 py-4 glass hover:bg-white/10 font-semibold rounded-full transition-smooth border border-white/10 text-base"
                    >
                        Get In Touch
                    </button>
                </div>

                {/* Social Links - Only show if available */}
                {(profile?.github || profile?.linkedin || profile?.email) && (
                    <div className="flex gap-4 justify-center mb-16">
                        {profile?.github && (
                            <a
                                href={profile.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-14 h-14 glass rounded-full flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-smooth border border-white/5"
                                aria-label="GitHub"
                            >
                                <Github className="w-6 h-6" />
                            </a>
                        )}
                        {profile?.linkedin && (
                            <a
                                href={profile.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-14 h-14 glass rounded-full flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-smooth border border-white/5"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-6 h-6" />
                            </a>
                        )}
                        {profile?.email && (
                            <a
                                href={`mailto:${profile.email}`}
                                className="w-14 h-14 glass rounded-full flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-smooth border border-white/5"
                                aria-label="Email"
                            >
                                <Mail className="w-6 h-6" />
                            </a>
                        )}
                    </div>
                )}

                {/* Scroll Indicator */}
                <div className="inline-block">
                    <button
                        onClick={() => scrollToSection('about')}
                        className="animate-bounce p-3 rounded-full glass hover:bg-white/10 transition-smooth border border-white/5"
                        aria-label="Scroll to about section"
                    >
                        <ArrowDown className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    )
}
