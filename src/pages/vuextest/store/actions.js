import axios from 'axios';
import { SET_STUDENTS } from './mutation-types';

const url = {
    queryStudents: '../../../../static/students.json',
}

export default{
    FETCH_OF_STUDENTS: (context, params) => axios.get(url.queryStudents, params).then((res) => {
        context.commit(SET_STUDENTS, res.data);
        return Promise.resolve(res);
    }),
}