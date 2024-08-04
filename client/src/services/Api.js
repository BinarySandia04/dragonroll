import axios from 'axios';

import { backendUrl } from './BackendURL';

export default () => {
    return axios.create({
        baseURL: backendUrl,
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            "Access-Control-Allow-Origin": "*",
        }
    });
}