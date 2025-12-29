'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Profile } from '@/types/database'
import { Mail, MapPin, Send, Github, Linkedin } from 'lucide-react'

export default function Contact() {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

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
        setStatus('loading')
        setErrorMessage('')

        const supabase = createClient()
        const { error } = await supabase
            .from('contact_submissions')
            .insert([{
                name: formData.name,
                email: formData.email,
                message: formData.message,
                is_read: false
            }])

        if (error) {
            setStatus('error')
            setErrorMessage('Failed to send message. Please try again.')
            return
        }

        setStatus('success')
        setFormData({ name: '', email: '', message: '' })

        setTimeout(() => {
            setStatus('idle')
        }, 5000)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <section id="contact" className="min-h-screen px-4 py-20">
            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Get In <span className="gradient-text">Touch</span>
                    </h2>
                    <div className="w-20 h-1 gradient-bg mx-auto rounded-full mb-6"></div>
                    <p className="text-text-secondary max-w-2xl mx-auto">
                        Have a project in mind or want to collaborate? Feel free to reach out!
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="glass p-8 rounded-2xl">
                            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Email</h4>
                                        <a
                                            href={`mailto:${profile?.email || 'your.email@example.com'}`}
                                            className="text-text-secondary hover:text-primary transition-smooth"
                                        >
                                            {profile?.email || 'your.email@example.com'}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Location</h4>
                                        <p className="text-text-secondary">
                                            {profile?.location || 'Your City, Country'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-8 pt-8 border-t border-card-border">
                                <h4 className="font-semibold mb-4">Follow Me</h4>
                                <div className="flex gap-4">
                                    {profile?.github && (
                                        <a
                                            href={profile.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 glass rounded-full flex items-center justify-center hover:scale-110 transition-smooth"
                                            aria-label="GitHub"
                                        >
                                            <Github className="w-5 h-5" />
                                        </a>
                                    )}
                                    {profile?.linkedin && (
                                        <a
                                            href={profile.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 glass rounded-full flex items-center justify-center hover:scale-110 transition-smooth"
                                            aria-label="LinkedIn"
                                        >
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="glass p-8 rounded-2xl">
                        <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg focus:outline-none focus:border-primary transition-smooth"
                                    placeholder="Your Name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg focus:outline-none focus:border-primary transition-smooth"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg focus:outline-none focus:border-primary transition-smooth resize-none"
                                    placeholder="Your message..."
                                />
                            </div>

                            {/* Status Messages */}
                            {status === 'success' && (
                                <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400">
                                    Message sent successfully! I&apos;ll get back to you soon.
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
                                    {errorMessage}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full px-6 py-4 gradient-bg text-white font-semibold rounded-lg hover:scale-105 transition-smooth shadow-lg shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
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
