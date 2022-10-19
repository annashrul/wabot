import fetchNow from '../_Fetch.jsx';

const RuleAPI = {
    createFe: (body) => {
        return fetchNow('/nodeFe', 'POST', body);
    },
     createPathDefaultFe: (body) => {
        return fetchNow('/pathFe', 'POST', body);
    },

    get: () => {
        return fetchNow('/node', 'GET');
    },
    getById: (id) => {
        return fetchNow('/node/' + id, 'GET');
    },
    create: (body) => {
        return fetchNow('/node', 'POST', body);
    },
    
    
    update: (id, body) => {
        return fetchNow('/node/' + id, 'PUT', body);
    },
    delete: (id) => {
        return fetchNow('/node/' + id, 'DELETE');
    },
    getPathByRule: (id) => {
        return fetchNow('/path/' + id, 'GET');
    },
    createPathInitial: (body) => {
        return fetchNow('/path/initial', 'POST', body);
    },
    createPathDefault: (body) => {
        return fetchNow('/path', 'POST', body);
    },
   
    updatePath: (id, body)=> {
        return fetchNow('/path/' + id , 'PUT', body);
    },
    deletePath: (id)=> {
        return fetchNow('/path/' + id , 'DELETE');
    },
    createPathForm: (body) => {
        return fetchNow('/path/eform', 'POST', body);
    },
    createPathAPI: (body) => {
        return fetchNow('/path/api', 'POST', body);
    },
    getAPINode: (id) => {
        return fetchNow('/node/api/' + id, 'GET');
    },
    getEformNode: (id) => {
        return fetchNow('/eform/' + id, 'GET');
    },
    createEform: (body) => {
        return fetchNow('/eform', 'POST', body);
    },
    updateEform: (id,body) => {
        return fetchNow('/eform/' + id, 'PUT', body);
    },
    deleteEform: (id,body) => {
        return fetchNow('/eform/' + id, 'DELETE', body);
    },
    getQuestion: (id) => {
        return fetchNow('/eform/quest/' + id, 'GET');
    },
    createQuestion: (body) => {
        return fetchNow('/eform/quest', 'POST', body, 'JSON');
    },
    updateQuestion: (id,body) => {
        return fetchNow('/eform/quest/' + id, 'PUT', body);
    },
    deleteQuestion: (id,body) => {
        return fetchNow('/eform/quest/' + id, 'DELETE',body);
    },
    createApiNode: (body) => {
        return fetchNow('/node/api', 'POST', body, 'JSON');
    },
    updateApiNode: (id,body) => {
        return fetchNow('/node/api/' + id, 'PUT', body);
    },
    deleteApiNode: (id,body) => {
        return fetchNow('/node/api/' + id, 'DELETE', body);
    },
    
}
 
export default RuleAPI;