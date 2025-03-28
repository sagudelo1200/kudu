/* Dashboard kudu */

import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'

const { Card, Divider } = require('@mui/material')

function Kudu() {
  return (
    <>
      <MDBox>
        <MDTypography variant='h1'>Kudu Cloud</MDTypography>
        <MDTypography variant='subtitle1' mb={3}>
          La Herramienta Scout que responde al Llamado de la Organización.
        </MDTypography>
        <Divider />
        <Card sx={{ overflow: 'visible' }}>
          <MDTypography m={1} variant='h3'>
            ✨ Introductión
          </MDTypography>
          <MDTypography m={1} variant='body2'>
            Kudu Cloud es una plataforma diseñada para la administración
            eficiente de grupos, regiones y naciones dentro del Movimiento
            Scout.
            <br />
            Su propósito es brindar una solución digital integral para la
            gestión de integrantes, actividades, eventos, permisos, documentos y
            demás funciones que promuevan la organización, las buenas prácticas
            y la transparencia en todos los niveles de la estructura scout.
          </MDTypography>
        </Card>
        <Divider />
        <Card sx={{ overflow: 'visible' }}>
          <MDTypography m={1} variant='h3'>
            📖 Resumen de la Propuesta
          </MDTypography>
          <MDTypography m={1} variant='body2'>
            El escultismo se basa en la formación de niños, niñas, adolescentes
            y jóvenes a través de valores, principios, actividades y retos para
            aprender haciendo. Sin embargo, la administración de los grupos y
            regiones puede volverse compleja sin herramientas adecuadas.
            <br />
            Kudu busca llenar este vacío con una solución digital rápida,
            escalable, segura y fácil de usar, que permite a dirigentes y
            miembros gestionar información de manera eficiente.
          </MDTypography>
        </Card>
        <Divider />
        <Card sx={{ overflow: 'visible' }}>
          <MDTypography m={1} variant='h3'>
            🚨 Problema
          </MDTypography>
          <MDTypography m={1} variant='body2'>
            Los grupos y regiones scouts suelen gestionar su administración
            mediante documentos físicos o herramientas digitales dispersas y
            desconectadas.
            <br />
            Esto dificulta la consolidación de datos, la transparencia en la
            gestión y el seguimiento de la progresión de los miembros.
            <br />
            Se requiere una plataforma unificada que permita un control
            eficiente y accesible.
          </MDTypography>
          <MDTypography m={1} variant='h4'>
            📜 Antecedentes del Problema
          </MDTypography>
          <MDTypography m={1} variant='body2'>
            Históricamente, los grupos scouts han dependido de registros
            manuales y métodos descentralizados de organización. Algunas
            soluciones digitales han intentado abordar este problema, pero no
            han logrado adaptarse completamente a la dinámica y necesidades
            específicas del escultismo actual.
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
            Desarrollar una plataforma web basada en Firebase y ReactJS que
            permita la gestión integral de grupos, regiones y naciones scout,
            facilitando la administración de información y procesos.
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
                  Diseñar una Arquitectura Robusta, Modular, Segura y Escalable.
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
                  Implementar un Sistema de Autenticación basado en roles y
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
                  Facilitar la gestión de integrantes, actividades, eventos,
                  documentos e información.
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
                  Integrar funcionalidades de reportes y métricas para la mejora
                  continua.
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
            Kudu Cloud es una respuesta a la necesidad de modernizar la gestión
            scout.
            <br />
            Al proporcionar una plataforma centralizada, se mejora la eficiencia
            administrativa, se reduce la carga de trabajo de los adultos
            voluntarios y se fomenta una mayor participación de los miembros
            mediante herramientas digitales accesibles.
          </MDTypography>
        </Card>
        <Divider />
        <Card sx={{ overflow: 'visible' }}>
          <MDTypography m={1} variant='h3'>
            🏛️ Fundamentos
          </MDTypography>
          <MDTypography m={1} variant='body2'>
            El desarrollo de Kudu Cloud se basa en los principios del escultismo
            y del software seguro, accesible y escalable. La arquitectura
            propuesta aprovecha Firebase para la autenticación y gestión de
            datos en tiempo real, junto con ReactJS para una experiencia de
            usuario fluida e intuitiva.
          </MDTypography>
        </Card>
      </MDBox>
    </>
  )
}

export default Kudu
