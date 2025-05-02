import MDTypography from 'components/MDTypography'
import { Card, Divider, Grid } from '@mui/material'
import MDBox from 'components/MDBox'

function KuduPage() {
  return (
    <>
      <Grid container spacing={2} justifyContent='center' alignItems='center'>
        <Grid item xs={12} md={10} lg={9}>
          <MDTypography variant='h1'>Kudu Cloud</MDTypography>
          <MDTypography variant='subtitle1' mb={3}>
            La herramienta Scout que responde al llamado de la organización.
          </MDTypography>
        </Grid>
        <Grid item xs={12} md={10} lg={9}>
          <Card sx={{ overflow: 'visible' }}>
            <MDTypography m={1} variant='h3'>
              ✨ Introducción
            </MDTypography>
            <MDTypography m={1} variant='body2'>
              Kudu Cloud llega para transformar la gestión scout con una
              solución digital eficiente y accesible. Miles de scouts dependen
              de registros manuales y sistemas dispersos, lo que provoca pérdida
              de tiempo y errores administrativos. Kudu Cloud promueve la
              organización, las buenas prácticas y la transparencia en todos los
              niveles de la estructura scout.
            </MDTypography>
          </Card>
          <Divider />
          <Card sx={{ overflow: 'visible' }}>
            <MDTypography m={1} variant='h3'>
              🚨 Problema
            </MDTypography>
            <MDTypography m={1} variant='body2'>
              La administración en las organizaciones scouts, desde grupos
              locales hasta regiones nacionales, enfrenta desafíos
              significativos debido al uso de documentos físicos y herramientas
              digitales no integradas. Esto genera:
            </MDTypography>

            <MDBox component='ul' m={0} pl={4} mb={2}>
              <MDBox
                component='li'
                color='text'
                fontSize='1.25rem'
                lineHeight={1}
              >
                <MDTypography
                  variant='body2'
                  color='text'
                  fontWeight='regular'
                  verticalAlign='middle'
                >
                  <b>Pérdida de información:</b> La falta de un sistema
                  centralizado dificulta el acceso y la conservación de datos
                  importantes.
                </MDTypography>
              </MDBox>
              <MDBox
                component='li'
                color='text'
                fontSize='1.25rem'
                lineHeight={1}
              >
                <MDTypography
                  variant='body2'
                  color='text'
                  fontWeight='regular'
                  verticalAlign='middle'
                >
                  <b>Falta de transparencia:</b> Los procesos administrativos
                  dispersos limitan la visibilidad y la rendición de cuentas en
                  todos los niveles.
                </MDTypography>
              </MDBox>
              <MDBox
                component='li'
                color='text'
                fontSize='1.25rem'
                lineHeight={1}
              >
                <MDTypography
                  variant='body2'
                  color='text'
                  fontWeight='regular'
                  verticalAlign='middle'
                >
                  <b>Dificultades para medir el crecimiento:</b> Sin datos
                  confiables y organizados, es complicado evaluar el impacto y
                  el desarrollo del movimiento scout.
                </MDTypography>
              </MDBox>
            </MDBox>
            <MDTypography m={1} variant='body2'>
              Estos problemas no solo afectan la eficiencia operativa, sino que
              también limitan el potencial de crecimiento y la capacidad de los
              scouts para cumplir su misión de formar mejores ciudadanos.
            </MDTypography>
          </Card>
          <Divider />
          <Card sx={{ overflow: 'visible' }}>
            <MDTypography m={1} variant='h3'>
              🎯 Objetivos
            </MDTypography>
            <MDTypography m={1} variant='h4'>
              Objetivo General
            </MDTypography>
            <MDTypography m={1} variant='body2'>
              Crear una plataforma digital eficiente y segura que simplifique la
              gestión de grupos, regiones y naciones scouts, optimizando la
              administración y promoviendo la transparencia.
            </MDTypography>

            <MDTypography m={1} variant='h4'>
              Objetivos Específicos
            </MDTypography>

            <MDBox component='ul' m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
              <MDBox
                component='li'
                color='text'
                fontSize='1.25rem'
                lineHeight={1}
              >
                <MDTypography
                  color='text'
                  fontWeight='regular'
                  verticalAlign='middle'
                >
                  <b>Diseñar</b> una arquitectura robusta, escalable y segura
                  con Firebase y ReactJS.
                </MDTypography>
              </MDBox>
              <MDBox
                component='li'
                color='text'
                fontSize='1.25rem'
                lineHeight={1}
              >
                <MDTypography
                  color='text'
                  fontWeight='regular'
                  verticalAlign='middle'
                >
                  <b>Implementar</b> un sistema de autenticación con roles y
                  permisos jerárquicos.
                </MDTypography>
              </MDBox>
              <MDBox
                component='li'
                color='text'
                fontSize='1.25rem'
                lineHeight={1}
              >
                <MDTypography
                  color='text'
                  fontWeight='regular'
                  verticalAlign='middle'
                >
                  <b>Facilitar</b> la gestión de integrantes, actividades,
                  documentos y eventos.
                </MDTypography>
              </MDBox>
              <MDBox
                component='li'
                color='text'
                fontSize='1.25rem'
                lineHeight={1}
              >
                <MDTypography
                  color='text'
                  fontWeight='regular'
                  verticalAlign='middle'
                >
                  <b>Integrar</b> funcionalidades de reportes y métricas para la
                  mejora continua.
                </MDTypography>
              </MDBox>
            </MDBox>
          </Card>
          <Divider />
          <Card sx={{ overflow: 'visible' }}>
            <MDTypography m={1} variant='h3'>
              🔥 Justificación
            </MDTypography>
            <MDTypography m={1} variant='body2'>
              Kudu Cloud no solo optimiza la gestión, sino que también reduce la
              carga administrativa de los adultos voluntarios, mejora la
              transparencia y facilita el acceso a la información en tiempo
              real. Con esta plataforma, los grupos scouts pueden enfocarse en
              lo que realmente importa: el desarrollo de los jóvenes.
            </MDTypography>
          </Card>
          <Divider />
          <Card sx={{ overflow: 'visible' }}>
            <MDTypography m={1} variant='h3'>
              🏛️ Fundamentos
            </MDTypography>
            <MDTypography m={1} variant='body2'>
              Kudu Cloud se basa en principios fundamentales que guían su
              desarrollo y propósito:
            </MDTypography>
            <MDBox component='ul' m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
              <MDBox
                component='li'
                color='text'
                fontSize='1.25rem'
                lineHeight={1}
              >
                <MDTypography
                  variant='body2'
                  color='text'
                  fontWeight='regular'
                  verticalAlign='middle'
                >
                  <b>Transparencia:</b> Promovemos una gestión clara y accesible
                  para todos los niveles de la organización scout, asegurando
                  que la información esté disponible de manera confiable.
                </MDTypography>
              </MDBox>
              <MDBox
                component='li'
                color='text'
                fontSize='1.25rem'
                lineHeight={1}
              >
                <MDTypography
                  variant='body2'
                  color='text'
                  fontWeight='regular'
                  verticalAlign='middle'
                >
                  <b>Colaboración:</b> Fomentamos el trabajo en equipo y la
                  participación activa de todos los miembros, desde líderes
                  hasta jóvenes scouts, para construir una comunidad más fuerte.
                </MDTypography>
              </MDBox>
              <MDBox
                component='li'
                color='text'
                fontSize='1.25rem'
                lineHeight={1}
              >
                <MDTypography
                  variant='body2'
                  color='text'
                  fontWeight='regular'
                  verticalAlign='middle'
                >
                  <b>Accesibilidad:</b> Diseñamos una plataforma inclusiva y
                  fácil de usar, accesible desde cualquier dispositivo, para
                  garantizar que todos puedan beneficiarse de sus
                  funcionalidades.
                </MDTypography>
              </MDBox>
              <MDBox
                component='li'
                color='text'
                fontSize='1.25rem'
                lineHeight={1}
              >
                <MDTypography
                  variant='body2'
                  color='text'
                  fontWeight='regular'
                  verticalAlign='middle'
                >
                  <b>Innovación:</b> Nos comprometemos a utilizar las mejores
                  prácticas y tecnologías modernas para ofrecer soluciones que
                  se adapten a las necesidades cambiantes del escultismo.
                </MDTypography>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default KuduPage
