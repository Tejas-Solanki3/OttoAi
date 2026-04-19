'use client'

import { useSession } from 'next-auth/react'
import { Calendar, Mail, Video, FileText, Check, Plus, AlertCircle, RefreshCw } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Settings() {
  const { status } = useSession()

  const [installedApps, setInstalledApps] = useState([])
  const [isMounting, setIsMounting] = useState(true)
  const [pendingIntegration, setPendingIntegration] = useState(null)

  const integrations = [
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Check for conflicts and add events to your calendar.',
      icon: <Calendar className="w-6 h-6 text-blue-600" />
    },
    {
      id: 'google-meet',
      name: 'Google Meet',
      description: 'Add Google Meet links to your booked events automatically.',
      icon: <Video className="w-6 h-6 text-green-600" />
    },
    {
      id: 'gmail',
      name: 'Gmail Integration',
      description: 'Let OttoAi summarize your daily inbox and proxy smart confirmations.',
      icon: <Mail className="w-6 h-6 text-red-500" />
    },
    {
      id: 'google-docs',
      name: 'Google Docs',
      description: 'Generate meeting notes documents automatically.',
      icon: <FileText className="w-6 h-6 text-blue-500" />
    }
  ]

  useEffect(() => {
    async function loadApps() {
      try {
        const res = await fetch('/api/user/preferences')
        const data = await res.json()
        if (data.user && Array.isArray(data.user.installed_apps)) {
           setInstalledApps(data.user.installed_apps)
        } else {
          setInstalledApps(integrations.map((item) => item.id))
        }
      } catch (e) {
        console.error(e)
        setInstalledApps(integrations.map((item) => item.id))
      } finally {
        setIsMounting(false)
      }
    }
    loadApps()
  }, [])

  const handleConnection = async (integrationId, currentlyConnected) => {
    setPendingIntegration(integrationId)
    let updated = []
    if (currentlyConnected) {
      updated = installedApps.filter(app => app !== integrationId)
    } else {
      updated = [...installedApps, integrationId]
    }
    
    setInstalledApps(updated) // Optimistic UI Update

    try {
      const res = await fetch('/api/user/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ installed_apps: updated })
      })
      if (!res.ok) throw new Error('Failed to update integration settings')
    } catch(e) {
      console.error(e)
      setInstalledApps(installedApps)
    } finally {
      setPendingIntegration(null)
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Integrations</h1>
        <p className="text-sm text-gray-500">Turn integrations on or off. Disabled integrations are blocked across the app immediately.</p>
      </div>

      {(status === 'loading' || isMounting) && (
         <div className="flex items-center gap-2 text-gray-500 mb-6 font-medium">
           <RefreshCw className="w-4 h-4 animate-spin" /> Syncing database...
         </div>
      )}

      {status === 'unauthenticated' && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 text-amber-800 text-sm w-full shadow-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>You are currently not signed in properly. Re-login to authorize these API integrations.</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {integrations.map((integration) => {
          const isConnected = installedApps.includes(integration.id)
          return (
            <div key={integration.id} className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col hover:border-gray-300 transition-colors shadow-sm relative overflow-hidden">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shadow-sm">
                  {integration.icon}
                </div>
                <button 
                  onClick={() => handleConnection(integration.id, isConnected)}
                  disabled={status === 'loading' || isMounting || pendingIntegration === integration.id}
                  className={`text-sm font-medium px-4 py-2 rounded-md border transition-all shadow-sm ${
                    isConnected 
                      ? 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-red-600 hover:border-red-200 group'
                      : 'border-black bg-black text-white hover:bg-gray-800 hover:scale-[1.02] active:scale-95'
                  }`}
                >
                  {pendingIntegration === integration.id ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" /> Updating...
                    </span>
                  ) : isConnected ? (
                    <span className="flex items-center gap-1">
                      <Check className="w-4 h-4 text-green-600 group-hover:hidden" />
                      <span className="group-hover:hidden text-green-700">Installed</span>
                      <span className="hidden group-hover:block">Remove</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Plus className="w-4 h-4" />
                      Add to Profile
                    </span>
                  )}
                </button>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{integration.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{integration.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
