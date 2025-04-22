/** 
  All of the routes for the Material Dashboard 3 PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Layouts
import Kudu from 'pages/kudu'

// @mui icons
import Icon from '@mui/material/Icon'

const routes = [
  {
    type: 'collapse',
    name: 'Dashboards',
    key: 'dashboards',
    icon: <Icon fontSize='small'>dashboard</Icon>,
    collapse: [
      {
        name: 'Kudu',
        key: 'kudu',
        route: '/dashboards/kudu',
        component: <Kudu />,
      },
    ],
  },
]
/* {
  kudu: [
    {
      type: 'collapse',
      name: 'Kudu',
      key: 'kudu',
      icon: <Icon fontSize='small'>home</Icon>,
      route: '/kudu',
      component: <Kudu />,
      noCollapse: true,
    },
    {
      type: 'collapse',
      name: 'Integrantes',
      key: 'integrantes',
      icon: <Icon fontSize='small'>diversity_3</Icon>,
      collapse: [
        {
          name: 'Cachorros',
          key: 'cachorros',
          route: '/integrantes/cachorros',
          component: <Cachorros />,
          layout: 'kudu',
        },
        {
          name: 'Lobatos',
          key: 'lobatos',
          route: '/integrantes/lobatos',
          component: <Lobatos />,
          layout: 'kudu',
        },
        {
          name: 'Webelos',
          key: 'webelos',
          route: '/integrantes/webelos',
          component: <Webelos />,
          layout: 'kudu',
        },
        {
          name: 'Scouts',
          key: 'scouts',
          route: '/integrantes/scouts',
          component: <Scouts />,
          layout: 'kudu',
        },
        {
          name: 'Pioneros-Caminantes',
          key: 'pioneros-caminantes',
          route: '/integrantes/pioneros-caminantes',
          component: <Pioneros />,
          layout: 'kudu',
        },
        {
          name: 'Rovers',
          key: 'rovers',
          route: '/integrantes/rovers',
          component: <Rovers />,
          layout: 'kudu',
        },
      ],
    },
    {
      type: 'collapse',
      name: 'Actividades',
      key: 'actividades',
      icon: <Icon fontSize='small'>list_alt</Icon>,
      collapse: [
        {
          name: 'Fichas de Programa',
          key: 'fichas-de-programa',
          route: '/actividades/fichas-de-programa',
          component: <></>,
        },
        {
          name: 'Programa Seguro',
          key: 'programa-seguro',
          route: '/actividades/programa-seguro',
          component: <></>,
        },
      ],
    },
  ],
} */

export default routes
