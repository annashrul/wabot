import fetchNow from '../_Fetch.jsx';

const RuleAPI = {
    get: () => {
        return fetchNow('/rule', 'GET');
    },
    getById: (id) => {
        return fetchNow('/rule/' + id, 'GET');
    },
    create: (body) => {
        return fetchNow('/rule', 'POST', body);
    },
    update: (id, body) => {
        return fetchNow('/rule/' + id, 'PUT', body);
    },
    delete: (id) => {
        return fetchNow('/rule/' + id, 'DELETE');
    }
}
 
export default RuleAPI;