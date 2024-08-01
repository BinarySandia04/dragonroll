import axios from 'axios';

import BackendURL from './BackendURL';

export default () => {
    return axios.create({
        baseURL: BackendURL,
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            "Access-Control-Allow-Origin": "*",
        }
    });
}