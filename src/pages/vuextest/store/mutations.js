import { SET_STUDENTS } from './mutation-types';
export default{
    [SET_STUDENTS](state, val){
        state.students = val || [];
    },
    SET_COUNT: (state, payload) => {
        state.count += payload.addNum;
    }
}