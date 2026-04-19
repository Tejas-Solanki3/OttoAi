'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Save } from 'lucide-react'

export default function SettingsPage() {
  const { data: session, update } = useSession()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '')
      setEmail(session.user.email || '')
    }
  }, [session])

  const handleSave = async () => {
    if (!name.trim()) return
    setIsSaving(true)
    try {
      const res = await fetch('/api/user/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      })
      if (!res.ok) throw new Error('Failed to update profile')
      await update({ name })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (e) {
      console.error(e)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Settings</h1>
        <p className="text-sm text-gray-500">Manage your profile and account details.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">
            {name ? name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-lg">{name || 'User'}</p>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-black transition-colors"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-500 bg-gray-50 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">Email is managed by your Google account and cannot be changed here.</p>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all shadow-sm ${
              saved ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-gray-800'
            } disabled:opacity-50`}
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
