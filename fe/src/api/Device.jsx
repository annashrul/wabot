import fetchNow from './_Fetch.jsx';

const DeviceAPI = {
    get: () => {
        return fetchNow('/device', 'GET');
    },
    create: (body) => {
        return fetchNow('/device', 'POST', body, 'form-data');
    },
    update: (body) => {
        return fetchNow('/device', 'PUT', body);
    },
    delete: (body) => {
        return fetchNow('/device', 'DELETE', body);
    }
}
 
export default DeviceAPI;