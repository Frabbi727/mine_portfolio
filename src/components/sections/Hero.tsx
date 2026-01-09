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

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 pt-32 pb-20">
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] opacity-50 animate-float"></div>
                <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-accent/20 rounded-full blur-[120px] opacity-50 animate-float" style={{ animationDelay: '-2s' }}></div>
            </div>

            <div className="relative z-10 text-center max-w-5xl mx-auto reveal">
                {/* Profile Badge */}
                <div className="mb-10 inline-block">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-full glass p-1.5 mx-auto transition-transform duration-500 group-hover:scale-[1.02]">
                            {profile?.avatar_url ? (
                                <img
                                    src={profile.avatar_url}
                                    alt={profile.full_name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-4xl md:text-5xl font-bold text-white">
                                    {profile ? getInitials(profile.full_name) : 'YN'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Greeting & Name */}
                <div className="space-y-4 mb-8">
                    <p className="text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-primary mb-2">
                        Welcome to my portfolio
                    </p>
                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-balance">
                        I&apos;m <span className="gradient-text">{profile?.full_name || 'Your Name'}</span>
                    </h1>
                </div>

                {/* Title */}
                <div className="mb-8">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-text-secondary tracking-tight">
                        {profile?.title || 'Full Stack Developer'}
                    </h2>
                </div>

                {/* Bio */}
                <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-12 leading-relaxed text-balance">
                    {profile?.bio || 'I build innovative web applications with modern technologies. Passionate about creating seamless user experiences and scalable solutions.'}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
                    <button
                        onClick={() => scrollToSection('projects')}
                        className="btn btn-primary btn-lg w-full sm:w-auto min-w-[200px]"
                    >
                        View Projects
                    </button>
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="btn btn-secondary btn-lg w-full sm:w-auto min-w-[200px]"
                    >
                        Get In Touch
                    </button>
                </div>

                {/* Social Links */}
                {(profile?.github || profile?.linkedin || profile?.email) && (
                    <div className="flex gap-6 justify-center mb-16">
                        {profile?.github && (
                            <a
                                href={profile.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-text-secondary hover:text-primary transition-all transform hover:scale-110"
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
                                className="text-text-secondary hover:text-primary transition-all transform hover:scale-110"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-6 h-6" />
                            </a>
                        )}
                        {profile?.email && (
                            <a
                                href={`mailto:${profile.email}`}
                                className="text-text-secondary hover:text-primary transition-all transform hover:scale-110"
                                aria-label="Email"
                            >
                                <Mail className="w-6 h-6" />
                            </a>
                        )}
                    </div>
                )}

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
                    <button
                        onClick={() => scrollToSection('about')}
                        className="group flex flex-col items-center gap-2 text-text-muted hover:text-primary transition-colors"
                    >
                        <span className="text-xs font-semibold uppercase tracking-widest">Scroll Down</span>
                        <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center p-1">
                            <div className="w-1 h-2 bg-primary rounded-full animate-bounce"></div>
                        </div>
                    </button>
                </div>
            </div>
        </section>
    )
}
