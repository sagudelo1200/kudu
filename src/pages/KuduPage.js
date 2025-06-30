import MDTypography from 'components/MDTypography'
import { Card, Divider, Grid } from '@mui/material'
import MDBox from 'components/MDBox'

function KuduPage() {
  return (
    <>
      <Grid container spacing={2} justifyContent='center' alignItems='center'>
        <Grid item xs={12} md={10} lg={9}>
          <MDTypography variant='h1'>Kudu</MDTypography>
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
              Kudu transforma la gestión scout mediante una solución digital
              integral, eficiente y segura. Frente a un entorno marcado por
              documentos físicos y plataformas desconectadas, Kudu centraliza
              procesos, mejora la organización, y permite tomar decisiones con
              datos confiables. Es momento de dejar de perder tiempo en la
              administración para volver al propósito: el desarrollo de los
              jóvenes.
            </MDTypography>
          </Card>
          <Divider />
          <Card sx={{ overflow: 'visible' }}>
            <MDTypography m={1} variant='h3'>
              🚨 Problema
            </MDTypography>
            <MDTypography m={1} variant='body2'>
              La administración en el escultismo —desde grupos locales hasta
              niveles nacionales— enfrenta dificultades reales:
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
                  <b>Pérdida de información:</b> La dispersión en documentos y
                  herramientas impide una trazabilidad segura.
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
                  <b>Falta de transparencia:</b> Procesos opacos que debilitan
                  la confianza y la rendición de cuentas.
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
                  <b>Ausencia de métricas claras:</b> Sin datos organizados, el
                  crecimiento y el impacto del escultismo no pueden ser
                  evaluados correctamente.
                </MDTypography>
              </MDBox>
            </MDBox>
            <MDTypography m={1} variant='body2'>
              Estos problemas frenan el potencial del movimiento y sobrecargan a
              los voluntarios, alejándolos de su misión educativa.
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
              Construir una plataforma digital escalable y segura para optimizar
              la gestión de estructuras scouts en todos los niveles.
            </MDTypography>

            <MDTypography m={1} variant='h4'>
              Objetivos Específicos
            </MDTypography>

            <MDBox component='ul' m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
              <MDBox component='li' color='text' lineHeight={1}>
                <MDTypography
                  color='text'
                  fontWeight='regular'
                  verticalAlign='middle'
                  fontSize='1rem'
                >
                  <b>Desarrollar</b> una arquitectura robusta, escalable y
                  segura con Firebase y React.
                </MDTypography>
              </MDBox>
              <MDBox component='li' color='text' lineHeight={1}>
                <MDTypography
                  color='text'
                  fontWeight='regular'
                  verticalAlign='middle'
                  fontSize='1rem'
                >
                  <b>Implementar</b> control de usuarios con roles jerárquicos y
                  permisos granulares.
                </MDTypography>
              </MDBox>
              <MDBox component='li' color='text' lineHeight={1}>
                <MDTypography
                  color='text'
                  fontWeight='regular'
                  verticalAlign='middle'
                  fontSize='1rem'
                >
                  <b>Gestionar</b> integrantes, actividades, eventos y
                  documentación de forma centralizada y eficiente.
                </MDTypography>
              </MDBox>
              <MDBox component='li' color='text' lineHeight={1}>
                <MDTypography
                  color='text'
                  fontWeight='regular'
                  verticalAlign='middle'
                  fontSize='1rem'
                >
                  <b>Integrar</b> paneles de análisis y reportes para evaluación
                  de impacto y métricas para la mejora continua.
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
              Kudu reduce la carga operativa, mejora la organización, y devuelve
              el tiempo a quienes lo necesitan: los líderes educativos. Un
              sistema ágil y accesible es vital para que el movimiento scout
              pueda escalar con eficiencia y enfoque.
            </MDTypography>
          </Card>
          <Divider />
          <Card sx={{ overflow: 'visible' }}>
            <MDTypography m={1} variant='h3'>
              🏛️ Fundamentos
            </MDTypography>
            <MDTypography m={1} variant='body2'>
              Kudu se basa en principios fundamentales que guían su desarrollo y
              propósito:
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
                  <b>Transparencia:</b> Acceso claro y oportuno a la
                  información. Lo que se gestiona, se puede confiar.
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
                  <b>Colaboración:</b> Participación activa de cada nivel:
                  dirigentes, jóvenes, acudientes, equipos nacionales.
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
                  <b>Accesibilidad:</b> Usabilidad multiplataforma, adaptable y
                  sin barreras.
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
                  <b>Innovación:</b> Construido con tecnologías modernas y
                  visión de futuro.
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
