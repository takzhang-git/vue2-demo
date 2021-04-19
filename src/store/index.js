import Vue from 'vue';
import Vuex from 'vuex';

import pageStore from '../pages/store';

Vue.use(Vuex);
const store = new Vuex.Store(
    {
        ...pageStore,
    }
);

export default store;