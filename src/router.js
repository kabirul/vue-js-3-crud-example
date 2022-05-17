import { createWebHistory, createRouter } from "vue-router";

import HomePage from "./components/HomePage.vue";
import AddBlog from "./components/AddBlog.vue";
import Blog from "./components/Blog.vue";
import BlogsList from "./components/BlogsList.vue";

const routes = [
  {
    path: "/",
    name: "home-page",	
    component: HomePage,
  },
  {
    path: "/home",
	name: "home-page",
    component: HomePage,
  },
  {
    path: "/add",
	name: "Add Blog",
    component: AddBlog,
  },
  {
    path: "/blogs/:id",
	name: "Edit Blog",
    component: Blog,
  },
  {
    path: "/blogs",
    name: "Blogs List",   
    component: BlogsList,
  },  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;