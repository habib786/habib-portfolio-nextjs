'use client'

import { useState } from 'react'
import { Send, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { isValidEmail } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { TextField, Box, Alert, CircularProgress } from '@mui/material'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    } else if (formData.subject.length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setErrors({})
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="space-y-6">
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
          <TextField
            label="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            required
            fullWidth
            disabled={isSubmitting}
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
          />
          <TextField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            required
            fullWidth
            disabled={isSubmitting}
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
          />
        </Box>

        <TextField
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          error={!!errors.subject}
          helperText={errors.subject}
          required
          fullWidth
          disabled={isSubmitting}
          variant="outlined"
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
        />

        <TextField
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          error={!!errors.message}
          helperText={errors.message || "Please include as much detail as possible about your project requirements."}
          required
          fullWidth
          disabled={isSubmitting}
          multiline
          rows={6}
          variant="outlined"
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
        />

        <AnimatePresence>
          {submitStatus === 'success' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
              <Alert severity="success" icon={<CheckCircle />} sx={{ borderRadius: 3 }}>
                <strong>Message sent successfully!</strong>
                <br />
                Thank you for reaching out. I&apos;ll get back to you within 24 hours.
              </Alert>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
              <Alert severity="error" icon={<XCircle />} sx={{ borderRadius: 3 }}>
                <strong>Something went wrong</strong>
                <br />
                Please try again or contact me directly via email.
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-14 rounded-xl text-lg font-bold bg-zinc-900 text-white hover:bg-zinc-800 transition-all relative group overflow-hidden"
        >
          {/* Yellow accent bar like the hero */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FACC15] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          
          <div className="flex items-center justify-center gap-2 relative z-10">
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </div>
        </Button>
      </Box>

      {/* Privacy Notice */}
      <div className="text-xs text-muted-foreground text-center">
        <p className="px-8">
          Your information is secure and will only be used to respond to your inquiry.
          I never share your details with third parties.
        </p>
      </div>
    </div>
  )
}