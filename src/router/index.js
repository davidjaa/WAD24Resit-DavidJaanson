import { createRouter, createWebHistory } from 'vue-router'
import Students from "../views/Students.vue";
import RPLManagement from "../views/RPLManagement.vue";

const routes = [{
  path: '/RPLManagement',
  name: 'RPLManagement',
  component: RPLManagement,
},
{
  path: '/Students',
  name: 'Students',
  component: Students,
},
, 
{ //will route to AllPosts view if none of the previous routes apply
  path: "/:catchAll(.*)",
  name: "RPLManagement",
  component: RPLManagement,
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
