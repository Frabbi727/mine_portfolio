import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, X, Image, FileText } from 'lucide-react'

interface FileUploadProps {
    type: 'image' | 'pdf'
    currentUrl?: string
    onUploadComplete: (url: string) => void
    label: string
    bucketName?: string
}

export default function FileUpload({
    type,
    currentUrl,
    onUploadComplete,
    label,
    bucketName = 'portfolio'
}: FileUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [preview, setPreview] = useState<string | null>(currentUrl || null)
    const [error, setError] = useState<string | null>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type
        if (type === 'image' && !file.type.startsWith('image/')) {
            setError('Please upload an image file (JPG, PNG, etc.)')
            return
        }
        if (type === 'pdf' && file.type !== 'application/pdf') {
            setError('Please upload a PDF file')
            return
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            setError('File size must be less than 5MB')
            return
        }

        setError(null)
        setUploading(true)

        try {
            const supabase = createClient()

            // Create a unique filename
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
            const filePath = `${type === 'image' ? 'avatars' : 'documents'}/${fileName}`

            // Upload file
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                })

            if (uploadError) throw uploadError

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from(bucketName)
                .getPublicUrl(filePath)

            setPreview(publicUrl)
            onUploadComplete(publicUrl)
        } catch (err: any) {
            console.error('Upload error:', err)
            setError(err.message || 'Failed to upload file. Please try again.')
        } finally {
            setUploading(false)
        }
    }

    const handleRemove = () => {
        setPreview(null)
        onUploadComplete('')
    }

    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold mb-2">{label}</label>

            {/* Preview */}
            {preview && (
                <div className="relative inline-block">
                    {type === 'image' ? (
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-primary/30">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="absolute top-1 right-1 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-smooth"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 p-3 bg-card-bg border border-card-border rounded-lg">
                            <FileText className="w-6 h-6 text-primary" />
                            <span className="text-sm text-text-secondary truncate max-w-xs">
                                {preview.split('/').pop()}
                            </span>
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="p-1 hover:bg-red-500/10 text-red-400 rounded transition-smooth"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Upload Button */}
            <div>
                <label className={`
          relative inline-flex items-center gap-2 px-6 py-3 
          ${uploading ? 'bg-gray-500/20 cursor-not-allowed' : 'bg-primary/10 hover:bg-primary/20 cursor-pointer'}
          text-primary font-medium rounded-lg transition-smooth
        `}>
                    {uploading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <span>Uploading...</span>
                        </>
                    ) : (
                        <>
                            {type === 'image' ? <Image className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                            <span>{preview ? 'Change' : 'Upload'} {type === 'image' ? 'Image' : 'PDF'}</span>
                        </>
                    )}
                    <input
                        type="file"
                        accept={type === 'image' ? 'image/*' : 'application/pdf'}
                        onChange={handleFileChange}
                        disabled={uploading}
                        className="hidden"
                    />
                </label>
                <p className="text-xs text-text-muted mt-1">
                    {type === 'image' ? 'JPG, PNG or GIF (max 5MB)' : 'PDF only (max 5MB)'}
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                    {error}
                </div>
            )}
        </div>
    )
}
