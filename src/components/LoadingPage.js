import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  CircularProgress,
  Box,
  Typography,
  Button,
  ThemeProvider,
} from '@mui/material'
import { CssBaseline } from '@mui/material'
import theme from 'assets/theme'
import themeDark from 'assets/theme-dark'

/**
 * 🦌 Página de Carga Scout
 *
 * Componente que mantiene la experiencia mientras Kudu se prepara
 *
 * @returns {JSX} Interfaz de carga con mensaje inspirador
 *
 * 🪶 Incluso la espera debe ser una experiencia digna del rugido
 */
export default function LoadingPage() {
  // 🎨 Detectar preferencia del sistema o usar tema oscuro por defecto
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const selectedTheme = prefersDark ? themeDark : theme

  // 🦌 Mensajes inspiradores mientras carga
  const loadingMessages = [
    '✨ No es magia... Es Kudu.',
    '🦌 Kudu toma posición… listo para avanzar.',
    '🎒 Preparando herramientas del verdadero liderazgo...',
    '📡 Conectando experiencia con propósito...',
    '🌍 Cartografiando el territorio digital scout...',
    '✨ Activando el núcleo del sistema...',
    '📜 Leyendo los principios, no solo el código...',
    '🎯 Fijando coordenadas de impacto real...',
    '🧭 Alineando dirección con visión de servicio...',
    '⚙️ Ajustando componentes con precisión y claridad...',
    '📦 Cargando módulos esenciales de gestión...',
    '💡 Compilando ideas brillantes...',
    '🔍 Explorando rutas óptimas de acción...',
    '🛤️ Preparando el camino para la comunidad...',
    '🪄 Transformando tareas en tiempo útil...',
    '🔐 Validando accesos con intención y estructura...',
    '🌐 Integrando personas, roles y misiones...',
    '🦌 ¿Sabías que el Kudu nunca olvida el trayecto recorrido?',
    '⏳ Casi todo listo… la eficiencia toma forma.',
    '🔁 Sincronizando datos con conciencia organizativa...',
    '👣 Cada paso nos acerca a tu destino...',
    '⚡ Encendiendo motores: lo importante comienza ahora.',
    '🚀 Un momento más… lanzamos en breve.',
    '🦌 Kudu está buscando el mejor camino...',
    '🎉 No es solo carga, es alineación estratégica.',
    '⏳ La paciencia es la clave del éxito...',
    '🧠 Procesando estructura… piensa, luego actúa.',
    '🗂️ Ordenando prioridades… para servir mejor.',
    '🏕️ Activando entorno de trabajo scout digital...',
    '⏳ Cargando... porque lo bueno siempre tarda un poco.',
    '🌅 Respirando la calma del atardecer...',
    '🌌 En la quietud se revela la fuerza...',
    '🎒 Empacando linterna, brújula y visión...',
    '📊 Cargando datos reales para decisiones reales.',
    '🔥 Kudu en marcha. Preciso. Robusto. Scout.',
    '🐾 ¿Sabías que un Kudu puede saltar hasta 3 metros?',
    '🏕️ Montando el campamento base...',
    '🚪 Abriendo puertas a nuevas posibilidades...',
    '🛤️ Construyendo caminos donde no los hay...',
  ]

  const message = useMemo(() => {
    const index = Math.floor(Math.random() * loadingMessages.length)
    return loadingMessages[index]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ThemeProvider theme={selectedTheme}>
      <CssBaseline />
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
        textAlign='center'
        px={3}
        sx={{ backgroundColor: 'background.default' }}
      >
        {/* Logo y branding */}
        <Box mb={4}>
          <Typography
            variant='h2'
            fontWeight='bold'
            sx={{
              color: selectedTheme.palette.info.main,
              textShadow:
                selectedTheme.palette.mode === 'dark'
                  ? '0 0 10px rgba(0,188,212,0.3)'
                  : 'none',
            }}
            mb={1}
          >
            🦌 Kudu
          </Typography>
          <Typography
            variant='h6'
            fontWeight='light'
            sx={{
              color:
                selectedTheme.palette.mode === 'dark' ? '#c2c8d4' : '#7b809a',
              opacity: 0.9,
            }}
          >
            Al servicio de los que sirven
          </Typography>
        </Box>

        {/* Spinner animado */}
        <Box mb={4}>
          <CircularProgress
            size={60}
            thickness={4}
            sx={{
              color: selectedTheme.palette.info.main,
              animation: 'pulse 2s infinite',
              filter:
                selectedTheme.palette.mode === 'dark'
                  ? 'drop-shadow(0 0 8px rgba(0,188,212,0.4))'
                  : 'none',
            }}
          />
        </Box>

        {/* Mensaje dinámico */}
        <Box mb={3} maxWidth='600px'>
          <Typography
            variant='h5'
            fontWeight='medium'
            sx={{
              color:
                selectedTheme.palette.mode === 'dark' ? '#ffffff' : '#344767',
              mb: 2,
            }}
          >
            {message}
          </Typography>
          <Typography
            variant='body2'
            sx={{
              color:
                selectedTheme.palette.mode === 'dark' ? '#c2c8d4' : '#7b809a',
              opacity: 0.9,
            }}
          >
            Gracias por esperar. La excelencia toma su tiempo.
          </Typography>
        </Box>

        {/* Botón de escape opcional */}
        <Box mt={4}>
          <Button
            component={Link}
            to='/'
            variant='outlined'
            size='small'
            sx={{
              color: selectedTheme.palette.secondary.main,
              borderColor: selectedTheme.palette.secondary.main,
              '&:hover': {
                backgroundColor: selectedTheme.palette.secondary.main,
                color: selectedTheme.palette.mode === 'dark' ? '#000' : '#fff',
              },
            }}
          >
            Volver al inicio
          </Button>
        </Box>

        {/* Animación CSS personalizada */}
        <Box
          component='style'
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }
              }
            `,
          }}
        />
      </Box>
    </ThemeProvider>
  )
}
