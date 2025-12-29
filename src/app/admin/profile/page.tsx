'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Profile } from '@/types/database'
import { Save, User } from 'lucide-react'
import FileUpload from '@/components/admin/FileUpload'

export default function ProfileAdmin() {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

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
        setLoading(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!profile) return

        setSaving(true)
        setMessage(null)

        const supabase = createClient()
        const { error } = await supabase
            .from('profile')
            .update({
                full_name: profile.full_name,
                title: profile.title,
                bio: profile.bio,
                about_me: profile.about_me,
                email: profile.email,
                github: profile.github,
                linkedin: profile.linkedin,
                location: profile.location,
                avatar_url: profile.avatar_url,
                resume_url: profile.resume_url,
            })
            .eq('id', profile.id)

        if (error) {
            setMessage({ type: 'error', text: 'Failed to save profile. Please try again.' })
        } else {
            setMessage({ type: 'success', text: 'Profile updated successfully!' })
            setTimeout(() => setMessage(null), 3000)
        }

        setSaving(false)
    }

    const handleChange = (field: keyof Profile, value: string) => {
        if (profile) {
            setProfile({ ...profile, [field]: value })
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!profile) {
        return (
            <div className="glass p-12 rounded-2xl text-center">
                <p className="text-text-secondary mb-4">No profile found. Please contact support.</p>
            </div>
        )
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    <span className="gradient-text">Profile Settings</span>
                </h1>
                <p className="text-text-secondary">
                    Update your personal information and contact details
                </p>
            </div>

            <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-6">
                {/* Header with Icon */}
                <div className="flex items-center gap-4 pb-6 border-b border-card-border">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Personal Information</h2>
                        <p className="text-sm text-text-muted">This appears on your portfolio homepage</p>
                    </div>
                </div>

                {/* Status Message */}
                {message && (
                    <div className={`p-4 rounded-lg border ${message.type === 'success'
                        ? 'bg-green-500/10 border-green-500/50 text-green-400'
                        : 'bg-red-500/10 border-red-500/50 text-red-400'
                        }`}>
                        {message.text}
                    </div>
                )}

                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={profile.full_name}
                            onChange={(e) => handleChange('full_name', e.target.value)}
                            className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg focus:outline-none focus:border-primary transition-smooth"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Professional Title <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={profile.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg focus:outline-none focus:border-primary transition-smooth"
                            placeholder="Full Stack Developer"
                        />
                    </div>
                </div>

                {/* Bio - For Hero Section */}
                <div>
                    <label className="block text-sm font-semibold mb-2">
                        Bio / Tagline <span className="text-red-400">*</span>
                    </label>
                    <textarea
                        required
                        rows={2}
                        value={profile.bio}
                        onChange={(e) => handleChange('bio', e.target.value)}
                        className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg focus:outline-none focus:border-primary transition-smooth resize-none"
                        placeholder="A brief tagline or introduction (1-2 sentences)"
                    />
                    <p className="text-xs text-text-muted mt-1">Short intro shown in the Hero section</p>
                </div>

                {/* About Me - For About Section */}
                <div>
                    <label className="block text-sm font-semibold mb-2">
                        About Me (Detailed)
                    </label>
                    <textarea
                        rows={6}
                        value={profile.about_me || ''}
                        onChange={(e) => handleChange('about_me', e.target.value)}
                        className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg focus:outline-none focus:border-primary transition-smooth resize-none"
                        placeholder="Tell visitors about yourself, your experience, background, and what you're passionate about... (longer description)"
                    />
                    <p className="text-xs text-text-muted mt-1">Detailed description shown in the About section</p>
                </div>

                {/* Contact Info */}
                <div className="pt-6 border-t border-card-border">
                    <h3 className="text-xl font-bold mb-4">Contact Information</h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Email Address <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="email"
                                required
                                value={profile.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg focus:outline-none focus:border-primary transition-smooth"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Location</label>
                            <input
                                type="text"
                                value={profile.location || ''}
                                onChange={(e) => handleChange('location', e.target.value)}
                                className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg focus:outline-none focus:border-primary transition-smooth"
                                placeholder="City, Country"
                            />
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="pt-6 border-t border-card-border">
                    <h3 className="text-xl font-bold mb-4">Social Media & Links</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">GitHub Profile URL</label>
                            <input
                                type="url"
                                value={profile.github || ''}
                                onChange={(e) => handleChange('github', e.target.value)}
                                className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg focus:outline-none focus:border-primary transition-smooth"
                                placeholder="https://github.com/yourusername"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">LinkedIn Profile URL</label>
                            <input
                                type="url"
                                value={profile.linkedin || ''}
                                onChange={(e) => handleChange('linkedin', e.target.value)}
                                className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg focus:outline-none focus:border-primary transition-smooth"
                                placeholder="https://linkedin.com/in/yourusername"
                            />
                        </div>
                    </div>
                </div>

                {/* File Uploads */}
                <div className="pt-6 border-t border-card-border">
                    <h3 className="text-xl font-bold mb-4">Media & Documents</h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        <FileUpload
                            type="image"
                            currentUrl={profile.avatar_url || ''}
                            onUploadComplete={(url) => handleChange('avatar_url', url)}
                            label="Profile Avatar"
                            bucketName="portfolio"
                        />

                        <FileUpload
                            type="pdf"
                            currentUrl={profile.resume_url || ''}
                            onUploadComplete={(url) => handleChange('resume_url', url)}
                            label="Resume / CV"
                            bucketName="portfolio"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-6">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-8 py-4 gradient-bg text-white font-semibold rounded-lg hover:scale-105 transition-smooth shadow-lg shadow-primary/30 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Save Changes
                            </>
                        )}
                    </button>

                    <a
                        href="/"
                        target="_blank"
                        className="px-8 py-4 glass hover:bg-hover-bg font-semibold rounded-lg transition-smooth"
                    >
                        Preview Site
                    </a>
                </div>
            </form>
        </div>
    )
}
