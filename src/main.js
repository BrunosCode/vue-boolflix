import Vue from 'vue';
import App from './App.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar as fasFaStar, faSearch, faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(fasFaStar, farFaStar, faSearch, faChevronLeft, faChevronRight, faTimes);
Vue.component('font-awesome-icon', FontAwesomeIcon);

import LangFlag from 'vue-lang-code-flags';
Vue.component('lang-flag', LangFlag);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
