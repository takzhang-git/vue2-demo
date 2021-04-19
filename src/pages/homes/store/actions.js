import axios from 'axios';

const url = {
    queryHeros: '../../../../static/heros.json',
}

export default{
    FETCH_OF_HEROS: (context, params) => axios.get(url.queryHeros, params).then((res) => {
        context.commit('SET_HEROS', res.data);
        return Promise.resolve(res);
    }),
}