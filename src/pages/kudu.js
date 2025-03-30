/* Dashboard kudu */

import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'

const { Card, Divider, Grid } = require('@mui/material')

function Kudu() {
  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Grid item xs={9}>
          <MDTypography variant='h1'>Kudu Cloud</MDTypography>
          <MDTypography variant='subtitle1' mb={3}>
            La Herramienta Scout que responde al Llamado de la Organización.
          </MDTypography>
        </Grid>
        <Grid item xs={9}>
          <MDBox>
            <Card sx={{ overflow: 'visible' }}>
              <MDTypography m={1} variant='h3'>
                ✨ Introducción
              </MDTypography>
              <MDTypography m={1} variant='body2'>
                Miles de scouts dependen de registros manuales y sistemas
                dispersos para gestionar sus actividades. ¿El resultado? Pérdida
                de tiempo, errores administrativos y falta de transparencia.
                <br />
                Kudu Cloud llega para transformar la gestión scout con una
                solución digital eficiente y accesible que promueve la
                organización, las buenas prácticas y la transparencia en todos
                los niveles de la estructura scout.
              </MDTypography>
            </Card>
            <Divider />
            <Card sx={{ overflow: 'visible' }}>
              <MDTypography m={1} variant='h3'>
                📖 Resumen de la Propuesta
              </MDTypography>
              <MDTypography m={1} variant='body2'>
                El escultismo forma líderes a través de experiencias prácticas,
                pero la administración de grupos sigue atrapada en el papel y
                herramientas dispersas. Kudu Cloud es la solución: una
                plataforma digital rápida, segura y escalable que permite a
                dirigentes y miembros gestionar información sin complicaciones.
              </MDTypography>
            </Card>
            <Divider />
            <Card sx={{ overflow: 'visible' }}>
              <MDTypography m={1} variant='h3'>
                🚨 Problema
              </MDTypography>
              <MDTypography m={1} variant='body2'>
                Los grupos y regiones scouts suelen gestionar su administración
                mediante documentos físicos, archivos de excel y otras
                herramientas digitales dispersas y desconectadas para su
                gestión.
                <br />
                Esto provoca pérdida de información, poca transparencia y
                dificultades para medir el crecimiento de los miembros. Sin una
                solución digital adecuada, el crecimiento del escultismo se
                frena.
              </MDTypography>
              <MDTypography m={1} variant='h4'>
                📜 Antecedentes del Problema
              </MDTypography>
              <MDTypography m={1} variant='body2'>
                Históricamente, los grupos scouts han dependido de registros
                manuales y métodos descentralizados de organización. Algunas
                soluciones digitales han intentado abordar este problema, pero
                no han logrado adaptarse completamente a la dinámica y
                necesidades específicas del escultismo actual.
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
                Crear una plataforma digital eficiente y segura que simplifique
                la gestión de grupos, regiones y naciones scouts, optimizando la
                administración y promoviendo la transparencia.
              </MDTypography>

              <MDTypography m={1} variant='h4'>
                Objetivos Específicos
              </MDTypography>
              <MDBox
                display='flex'
                justifyContent='space-between'
                alignItems='flex-end'
                flexWrap='wrap'
              >
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
                      Diseñar una arquitectura robusta, escalable y segura con
                      Firebase y ReactJS.
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
                      eventos y documentos.
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
                      <b>Integrar</b> funcionalidades de reportes y métricas
                      para la mejora continua.
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
            <Divider />
            <Card sx={{ overflow: 'visible' }}>
              <MDTypography m={1} variant='h3'>
                🔥 Justificación
              </MDTypography>
              <MDTypography m={1} variant='body2'>
                Kudu Cloud no solo optimiza la gestión, sino que también reduce
                la carga administrativa de los adultos voluntarios, mejora la
                transparencia y facilita el acceso a la información en tiempo
                real.
                <br />
                Con esta plataforma, los grupos scouts pueden enfocarse en lo
                que realmente importa: el desarrollo de los jóvenes.
              </MDTypography>
            </Card>
            <Divider />
            <Card sx={{ overflow: 'visible' }}>
              <MDTypography m={1} variant='h3'>
                🏛️ Fundamentos
              </MDTypography>
              <MDTypography m={1} variant='body2'>
                Kudu Cloud se basa en Firebase, una tecnología confiable que
                permite almacenamiento seguro y sincronización en tiempo real,
                ideal para gestionar datos de scouts en cualquier lugar. Con
                ReactJS, ofrecemos una interfaz rápida, intuitiva y accesible
                desde cualquier dispositivo.
              </MDTypography>
            </Card>
          </MDBox>
        </Grid>
      </Grid>
    </>
  )
}

export default Kudu
