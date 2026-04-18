'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Calendar, Mail, Video, FileText, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

const fadeVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } }
}

const trustMarks = [
  { icon: Calendar, label: 'Google Calendar' },
  { icon: Video, label: 'Google Meet' },
  { icon: Mail, label: 'Gmail' },
  { icon: FileText, label: 'Google Docs' },
]

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-gray-200">
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
              <div className="w-6 h-6 bg-black rounded-md flex items-center justify-center">
                <span className="text-white text-xs font-bold">O</span>
              </div>
              <span className="text-lg font-semibold tracking-tight text-black">OttoAi</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Features</Link>
              <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Pricing</Link>
              <Link href="#blog" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Blog</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-black transition-colors hidden sm:block">
                Log in
              </Link>
              <Link 
                href="/login" 
                className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pb-32 overflow-hidden">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-5xl sm:text-7xl font-bold tracking-tight text-black mb-8 max-w-4xl mx-auto"
          >
            Your autonomous personal operations platform.
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            OttoAi connects your Gmail, Calendar, and Meet — then works in the background to summarize your inbox, track subscriptions, and keep you organized.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button 
              onClick={() => router.push('/login')}
              className="bg-black text-white px-8 py-3.5 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-sm text-base"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
          <motion.p variants={itemVariants} className="mt-4 text-sm text-gray-500">Powered by your Google account.</motion.p>
        </motion.div>
      </section>

      {/* Trust Badge Section */}
      <motion.section 
        className="py-14 border-y border-gray-100 bg-gradient-to-b from-gray-50 to-white"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-[0.28em]">Integrates seamlessly with your favorite tools</p>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white/80 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/90 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-white/90 to-transparent z-10" />

            <div className="marquee-group py-8 space-y-4">
              <div className="marquee-track marquee-track-left">
                {[...trustMarks, ...trustMarks].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={`top-${item.label}-${index}`} className="marquee-pill">
                      <span className="marquee-icon">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span>{item.label}</span>
                    </div>
                  )
                })}
              </div>

              <div className="marquee-track marquee-track-right">
                {[...trustMarks, ...trustMarks].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={`bottom-${item.label}-${index}`} className="marquee-pill marquee-pill-ghost">
                      <span className="marquee-icon">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span>{item.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight text-black mb-4">Everything you need to master your schedule</motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl">A complete toolset designed to make your booking experience seamless and professional.</motion.p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
              <FeatureCard 
                icon={<CheckCircle2 className="w-6 h-6" />}
                title="Automated Workflows"
                description="Send reminders, thank you notes, and follow-ups automatically. Never miss a beat."
              />
            </motion.div>
            <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
              <FeatureCard 
                icon={<Video className="w-6 h-6" />}
                title="Dynamic Video Links"
                description="Automatically generate unique Google Meet or Zoom links for every new booked event."
              />
            </motion.div>
            <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
              <FeatureCard 
                icon={<Calendar className="w-6 h-6" />}
                title="Calendar Sync"
                description="Check for conflicts across all your calendars and only show your true availability."
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
              <div className="w-6 h-6 bg-black rounded-md flex items-center justify-center">
                <span className="text-white text-xs font-bold">O</span>
              </div>
              <span className="text-lg font-semibold tracking-tight text-black">OttoAi</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link href="#" className="hover:text-black">Privacy Policy</Link>
              <Link href="#" className="hover:text-black">Terms of Service</Link>
              <Link href="#" className="hover:text-black">Contact</Link>
            </div>
          </div>
          <div className="mt-8 text-center md:text-left text-sm text-gray-400">
            &copy; {new Date().getFullYear()} OttoAi. Built for your Google workflow.
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-8 rounded-2xl border border-gray-100 bg-gray-50/50 hover:border-gray-200 transition-colors h-full">
      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-black shadow-sm mb-6 border border-gray-100">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-black mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}
