'use client'

import { useState, useEffect } from 'react'
import { Box, Fab, Zoom, useScrollTrigger } from '@mui/material'
import { KeyboardArrowUp } from '@mui/icons-material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

export default function FloatingActions() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  })

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Placeholder phone number - user should update this
  // Replace '+1234567890' with your actual WhatsApp number
  const whatsappNumber = '+1234567890' 
  const whatsappMessage = 'Hello Habib, I saw your portfolio and would like to chat.'
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 1200,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {/* WhatsApp Button */}
      <Fab
        color="success"
        size="large"
        aria-label="chat on whatsapp"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          bgcolor: '#25D366',
          boxShadow: '0 8px 16px rgba(37, 211, 102, 0.25)',
          '&:hover': {
            bgcolor: '#128C7E',
            transform: 'scale(1.1) translateY(-4px)',
            boxShadow: '0 12px 20px rgba(37, 211, 102, 0.3)',
          },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: 24, color: 'white' }} />
      </Fab>

      {/* Scroll to Top Button */}
      <Zoom in={trigger}>
        <Fab
          color="primary"
          size="medium"
          aria-label="scroll back to top"
          onClick={scrollToTop}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            boxShadow: '0 8px 16px rgba(16, 106, 90, 0.2)',
            '&:hover': {
              bgcolor: 'primary.dark',
              transform: 'scale(1.1) translateY(-4px)',
              boxShadow: '0 12px 20px rgba(16, 106, 90, 0.25)',
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <KeyboardArrowUp />
        </Fab>
      </Zoom>
    </Box>
  )
}
