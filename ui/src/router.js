import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import CountryInfo from './views/CountryInfo.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/c',
      name: 'country-info',
      component: CountryInfo
    }
  ]
});
