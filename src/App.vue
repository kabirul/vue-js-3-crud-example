<template>
   <div id="app">
   <Header></Header> 
    <div class="container mt-3">
      <router-view />
    </div>	
	<Footer></Footer>
  </div>
</template>

<script>

import Footer from './components/Footer.vue';
import Header from './components/Header.vue';

export default {
  name: 'App',
   components: {
    Footer,
	Header
   }  
}
</script>