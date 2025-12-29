'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ContactSubmission } from '@/types/database'
import { Mail, Trash2, Check } from 'lucide-react'

export default function ContactsAdmin() {
    const [contacts, setContacts] = useState<ContactSubmission[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchContacts()
    }, [])

    const fetchContacts = async () => {
        const supabase = createClient()
        const { data } = await supabase
            .from('contact_submissions')
            .select('*')
            .order('created_at', { ascending: false })

        if (data) {
            setContacts(data)
        }
        setLoading(false)
    }

    const toggleRead = async (contact: ContactSubmission) => {
        const supabase = createClient()
        const { error } = await supabase
            .from('contact_submissions')
            .update({ is_read: !contact.is_read })
            .eq('id', contact.id)

        if (!error) {
            fetchContacts()
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return

        const supabase = createClient()
        const { error } = await supabase
            .from('contact_submissions')
            .delete()
            .eq('id', id)

        if (!error) {
            fetchContacts()
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    const unreadCount = contacts.filter(c => !c.is_read).length

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    <span className="gradient-text">Contact Messages</span>
                </h1>
                <p className="text-text-secondary">
                    You have {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
                </p>
            </div>

            {contacts.length === 0 ? (
                <div className="glass p-12 rounded-2xl text-center">
                    <Mail className="w-16 h-16 mx-auto mb-4 text-text-muted" />
                    <p className="text-text-secondary">No messages yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {contacts.map((contact) => (
                        <div
                            key={contact.id}
                            className={`glass p-6 rounded-2xl transition-smooth ${!contact.is_read ? 'border-l-4 border-primary' : ''
                                }`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold mb-1">{contact.name}</h3>
                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="text-primary hover:underline"
                                    >
                                        {contact.email}
                                    </a>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => toggleRead(contact)}
                                        className={`p-2 rounded-lg transition-smooth ${contact.is_read
                                                ? 'bg-gray-500/20 text-gray-400'
                                                : 'bg-green-500/20 text-green-400'
                                            }`}
                                        title={contact.is_read ? 'Mark as unread' : 'Mark as read'}
                                    >
                                        <Check className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(contact.id)}
                                        className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-smooth"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <p className="text-text-secondary whitespace-pre-wrap mb-4">
                                {contact.message}
                            </p>

                            <p className="text-sm text-text-muted">
                                Received: {new Date(contact.created_at).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
