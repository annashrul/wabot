const fetchNow = async (sub, method, body, headers) => {
    let url = process.env.REACT_APP_API + '/api' + sub;
    let response;

    console.log("###########################",url)
    
    if(body) {
        /* Assign Request Headers */
        let requestHeaders = {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-type': ''
        }

        /* Assign Request Body */
        let requestBody = body;

        /* Check Headers Type (JSON, Media, or Form URL Encoded) */
        if(headers) {
            if(headers === 'JSON') {
                /* Handle JSON */
                requestHeaders['Content-type'] = 'application/json';
                requestBody = JSON.stringify(body);
            }else{
                /* Handle Media Upload */
                delete requestHeaders['Content-type'];
            }
        }else {
            /* Handle Form URL Encoded */
            requestHeaders['Content-type'] = 'application/x-www-form-urlencoded';
        }

        /* Request to API */
        response = await fetch(url, {
            method: method,
            headers: requestHeaders,
            body: requestBody
        });
    }else {
        /* Request to API without Body */
        response = await fetch(url, {
            method: method,
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        });
    }

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

export default fetchNow;