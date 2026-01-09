'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Profile } from '@/types/database'
import { Mail, Github, Linkedin, Send, MessageSquare, User, AtSign } from 'lucide-react'

export default function Contact() {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('sending')

        // Mock submission for now
        setTimeout(() => {
            setStatus('success')
            setFormData({ name: '', email: '', message: '' })
            setTimeout(() => setStatus('idle'), 5000)
        }, 1500)
    }

    return (
        <section id="contact" className="section-padding px-6">
            <div className="section-container">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4 reveal">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Get In <span className="gradient-text">Touch</span>
                    </h2>
                    <p className="text-text-secondary max-w-2xl mx-auto text-lg text-balance">
                        Have a project in mind or just want to say hi? I&apos;m always open to discussing new opportunities.
                    </p>
                    <div className="w-20 h-1.5 gradient-bg mx-auto rounded-full"></div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 reveal" style={{ animationDelay: '200ms' }}>
                    {/* Information Side */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="glass p-8 space-y-8">
                            <h3 className="text-2xl font-bold tracking-tight">Contact Information</h3>

                            <div className="space-y-6">
                                {profile?.email && (
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 glass flex items-center justify-center text-primary border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-300 rounded-xl">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Email Me</p>
                                            <a href={`mailto:${profile.email}`} className="text-text-primary font-medium hover:text-primary transition-colors">
                                                {profile.email}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {profile?.github && (
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 glass flex items-center justify-center text-primary border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-300 rounded-xl">
                                            <Github size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Follow Me</p>
                                            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-text-primary font-medium hover:text-primary transition-colors">
                                                github.com/profile
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {profile?.linkedin && (
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 glass flex items-center justify-center text-primary border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-300 rounded-xl">
                                            <Linkedin size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Connect</p>
                                            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-primary font-medium hover:text-primary transition-colors">
                                                linkedin.com/in/profile
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Availability Status */}
                        <div className="glass p-6 border-success/20 bg-success/5 flex items-center gap-4">
                            <div className="w-3 h-3 bg-success rounded-full animate-pulse shadow-[0_0_8px_var(--success)]"></div>
                            <p className="text-sm font-medium text-success">Available for new projects & collaborations</p>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="lg:col-span-7">
                        <form onSubmit={handleSubmit} className="glass p-8 md:p-10 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-semibold text-text-secondary ml-1 flex items-center gap-2">
                                        <User size={14} className="text-primary" /> Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="w-full bg-gray-900/50 border-white/5 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-xl py-4 px-5 text-text-primary transition-all outline-none"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-semibold text-text-secondary ml-1 flex items-center gap-2">
                                        <AtSign size={14} className="text-primary" /> Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full bg-gray-900/50 border-white/5 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-xl py-4 px-5 text-text-primary transition-all outline-none"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-semibold text-text-secondary ml-1 flex items-center gap-2">
                                    <MessageSquare size={14} className="text-primary" /> Message
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    rows={5}
                                    className="w-full bg-gray-900/50 border-white/5 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-xl py-4 px-5 text-text-primary transition-all outline-none resize-none"
                                    placeholder="Tell me about your project..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="btn btn-primary btn-lg w-full !py-4 rounded-xl text-lg group"
                            >
                                {status === 'sending' ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                        Sending...
                                    </>
                                ) : status === 'success' ? (
                                    <>Message Sent!</>
                                ) : (
                                    <>
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-16 pt-8 border-t border-card-border">
                    <p className="text-text-muted">
                        © {new Date().getFullYear()} {profile?.full_name || 'Your Name'}. Built with Next.js & Supabase.
                    </p>
                </div>
            </div>
        </section>
    )
}
