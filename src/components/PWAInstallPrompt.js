import React, { useState, useEffect } from 'react'
import MDButton from 'components/MDButton'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import { Card, CardContent, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import GetAppIcon from '@mui/icons-material/GetApp'

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      )
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      console.log(`Usuario ${outcome} la instalación`)
      setDeferredPrompt(null)
      setShowPrompt(false)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
  }

  if (!showPrompt) return null

  return (
    <MDBox
      position='fixed'
      bottom={20}
      right={20}
      zIndex={9999}
      sx={{ maxWidth: 350 }}
    >
      <Card elevation={6}>
        <CardContent>
          <MDBox
            display='flex'
            justifyContent='space-between'
            alignItems='flex-start'
            mb={2}
          >
            <MDTypography variant='h6' fontWeight='medium'>
              Instalar Kudu
            </MDTypography>
            <IconButton onClick={handleDismiss} size='small'>
              <CloseIcon />
            </IconButton>
          </MDBox>

          <MDTypography variant='body2' color='text' mb={2}>
            Instala Kudu en tu dispositivo para acceso rápido y experiencia
            offline.
          </MDTypography>

          <MDBox display='flex' gap={1}>
            <MDButton
              variant='gradient'
              color='info'
              size='small'
              startIcon={<GetAppIcon />}
              onClick={handleInstallClick}
            >
              Instalar
            </MDButton>
            <MDButton
              variant='text'
              color='secondary'
              size='small'
              onClick={handleDismiss}
            >
              Ahora no
            </MDButton>
          </MDBox>
        </CardContent>
      </Card>
    </MDBox>
  )
}

export default PWAInstallPrompt
