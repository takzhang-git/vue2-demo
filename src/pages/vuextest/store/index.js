import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
    state: {
        students: [],
        count: 10,
    },
    getters,
    mutations,
    actions,
}