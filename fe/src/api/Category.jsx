import fetchNow from './_Fetch.jsx';

const CategoryAPI = {
    get: () => {
        return fetchNow('/category', 'GET');
    },
    create: (body) => {
        return fetchNow('/category', 'POST', body);
    },
    update: (body) => {
        return fetchNow('/category', 'PUT', body);
    },
    delete: (body) => {
        return fetchNow('/category', 'DELETE', body);
    },

    getMember: (id) => {
        return fetchNow('/category/member/' + id, 'GET');
    },
    addMember: (body) => {
        return fetchNow('/category/member', 'POST', body);
    },
    removeMember: (body) => {
        return fetchNow('/category/member', 'DELETE', body);
    }
}
 
export default CategoryAPI;