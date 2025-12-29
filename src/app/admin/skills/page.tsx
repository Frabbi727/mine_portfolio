'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Skill } from '@/types/database'
import { Plus, Edit, Trash2, Lightbulb } from 'lucide-react'

export default function SkillsAdmin() {
    const [skills, setSkills] = useState<Skill[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null)

    useEffect(() => {
        fetchSkills()
    }, [])

    const fetchSkills = async () => {
        const supabase = createClient()
        const { data } = await supabase
            .from('skills')
            .select('*')
            .order('order', { ascending: true })

        if (data) {
            setSkills(data)
        }
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this skill?')) return

        const supabase = createClient()
        const { error } = await supabase
            .from('skills')
            .delete()
            .eq('id', id)

        if (!error) {
            fetchSkills()
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (showForm || editingSkill) {
        return (
            <SkillForm
                skill={editingSkill}
                onClose={() => {
                    setShowForm(false)
                    setEditingSkill(null)
                    fetchSkills()
                }}
            />
        )
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
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        <span className="gradient-text">Skills</span>
                    </h1>
                    <p className="text-text-secondary">Manage your technical skills and proficiencies</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="px-6 py-3 gradient-bg text-white font-semibold rounded-lg hover:scale-105 transition-smooth shadow-lg shadow-primary/30 flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Add Skill
                </button>
            </div>

            {skills.length === 0 ? (
                <div className="glass p-12 rounded-2xl text-center">
                    <p className="text-text-secondary mb-4">No skills yet</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-6 py-3 gradient-bg text-white font-semibold rounded-lg hover:scale-105 transition-smooth"
                    >
                        Add Your First Skill
                    </button>
                </div>
            ) : (
                <div className="space-y-8">
                    {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                        <div key={category} className="glass p-6 rounded-2xl">
                            <h2 className="text-2xl font-bold mb-4 gradient-text">{category}</h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {categorySkills.map((skill) => (
                                    <div key={skill.id} className="glass p-4 rounded-lg hover:bg-hover-bg transition-smooth">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                {skill.icon_url ? (
                                                    <img src={skill.icon_url} alt={skill.name} className="w-8 h-8" />
                                                ) : (
                                                    <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                                                        {skill.name.charAt(0)}
                                                    </div>
                                                )}
                                                <span className="font-semibold">{skill.name}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setEditingSkill(skill)}
                                                    className="p-1 hover:bg-primary/10 rounded transition-smooth"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(skill.id)}
                                                    className="p-1 hover:bg-red-500/10 text-red-400 rounded transition-smooth"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Proficiency Bar */}
                                        <div className="w-full bg-card-bg rounded-full h-2 overflow-hidden">
                                            <div
                                                className="gradient-bg h-full rounded-full transition-all"
                                                style={{ width: `${skill.proficiency}%` }}
                                            ></div>
                                        </div>
                                        <div className="text-right text-xs text-text-muted mt-1">
                                            {skill.proficiency}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

function SkillForm({ skill, onClose }: { skill: Skill | null; onClose: () => void }) {
    const [formData, setFormData] = useState({
        name: skill?.name || '',
        category: skill?.category || '',
        icon_url: skill?.icon_url || '',
        proficiency: skill?.proficiency || 50,
        order: skill?.order || 0,
    })
    const [saving, setSaving] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        const supabase = createClient()

        let error
        if (skill) {
            const result = await supabase
                .from('skills')
                .update(formData)
                .eq('id', skill.id)
            error = result.error
        } else {
            const result = await supabase
                .from('skills')
                .insert([formData])
            error = result.error
        }

        if (!error) {
            onClose()
        }
        setSaving(false)
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    <span className="gradient-text">{skill ? 'Edit' : 'Add'} Skill</span>
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-card-border">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Lightbulb className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Skill Details</h2>
                        <p className="text-sm text-text-muted">Add a new skill to your portfolio</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Skill Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg focus:outline-none focus:border-primary transition-smooth"
                            placeholder="e.g., React, Python, Docker"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Category <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg focus:outline-none focus:border-primary transition-smooth"
                            placeholder="e.g., Languages, Frameworks, Tools"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Icon URL (Optional)</label>
                    <input
                        type="url"
                        value={formData.icon_url}
                        onChange={(e) => setFormData({ ...formData, icon_url: e.target.value })}
                        className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg focus:outline-none focus:border-primary transition-smooth"
                        placeholder="https://example.com/icon.png"
                    />
                    <p className="text-xs text-text-muted mt-1">
                        Optional: URL to an icon image for this skill
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">
                        Proficiency Level: {formData.proficiency}%
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={formData.proficiency}
                        onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
                        className="w-full h-2 bg-card-bg rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-text-muted mt-1">
                        <span>Beginner</span>
                        <span>Intermediate</span>
                        <span>Expert</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Display Order</label>
                    <input
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-lg focus:outline-none focus:border-primary transition-smooth"
                        placeholder="0"
                    />
                    <p className="text-xs text-text-muted mt-1">
                        Lower numbers appear first (0, 1, 2, etc.)
                    </p>
                </div>

                <div className="flex gap-4 pt-6">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-8 py-4 gradient-bg text-white font-semibold rounded-lg hover:scale-105 transition-smooth shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? 'Saving...' : skill ? 'Update Skill' : 'Add Skill'}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-8 py-4 glass hover:bg-hover-bg font-semibold rounded-lg transition-smooth"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
