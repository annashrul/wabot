import fetchNow from './_Fetch.jsx';

const AuthAPI = {
    get: () => {
        return fetchNow('/auth/user', 'GET');
    },
    getPackage: () => {
        return fetchNow('/auth/user/package', 'GET');
    },
    update: (body) => {
        return fetchNow('/auth/user', 'PUT', body)
    },
    generateToken: () => {
        return fetchNow('/auth/user/token', 'POST')
    },

    login: (body) => {
        return fetchAuth('/auth/login', body);
    },
    register: (body) => {
        return fetchAuth('/auth/user', body);
    }
}

const fetchAuth = async (sub, data) => {
    let url = process.env.REACT_APP_API + '/api' + sub;

    let response = await fetch(url, {
        method: 'POST',
        body: data
    });

    if(response.status !== 500) {
        /* Parse Response to JSON */
        let data = await response.json();
    
        /* Handle Unauthorized (Expired Token) */
        if(data.status){
            if(data.status === 401) {
                window.location.reload();
            }
        }
    
        /* Return Reponse Data */
        return data;
    }else{
        /* Return Error if Internal Server Error (500) */
        return {
            status: 500,
            message: 'Internal Server Error',
            data: []
        }
    }
}

export default AuthAPI;