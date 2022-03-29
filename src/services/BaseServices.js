import axios from 'axios';
import { DOMAIN_CYBERLEARN, TOKEN } from '../util/settingSystem';

export class BaseServices {
    //put JSON về phía BE
    put = (url, model) => {
        return axios({
            url: `${DOMAIN_CYBERLEARN}/${url}`,
            method: 'PUT',
            data: model,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
            }
        })
    }

    post = (url, model) => {
        return axios({
            url: `${DOMAIN_CYBERLEARN}/${url}`,
            method: 'POST',
            data: model,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
            }
        })
    }

    get = (url, model) => {
        return axios({
            url: `${DOMAIN_CYBERLEARN}/${url}`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
            }
        })
    }


    delete = (url, model) => {
        return axios({
            url: `${DOMAIN_CYBERLEARN}/${url}`,
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
            }
        })
    }
}