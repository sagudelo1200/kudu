import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

export default function LoadingPage() {
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
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <i className='fas fa-circle' />
      <h1>{message}</h1>
      <p>Gracias por esperar.</p>
      <Link to='/'>Volver al inicio</Link>
    </div>
  )
}
