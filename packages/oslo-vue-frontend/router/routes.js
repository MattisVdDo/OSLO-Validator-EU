import Vue from 'vue';
import Router from 'vue-router';
import HomeView from "../src/views/HomeView";
import ResultView from "../src/views/ResultView";

Vue.use(Router);

// TODO: base property should be set from config

export default new Router({
   mode: 'history',
   base: '/shacl-validator/',
   routes: [
       {
           path: '/',
           name: 'Home',
           component: HomeView
       },
       {
           path: '/results/',
           name: 'Result',
           component: ResultView
       }
   ]
});
