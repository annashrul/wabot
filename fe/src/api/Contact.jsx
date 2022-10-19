import fetchNow from './_Fetch.jsx';

const ContactAPI = {
    get: () => {
        return fetchNow('/contact', 'GET');
    },
    create: (body) => {
        return fetchNow('/contact', 'POST', body, 'data-form');
    },
    update: (body) => {
        return fetchNow('/contact', 'PUT', body);
    },
    delete: (body) => {
        return fetchNow('/contact', 'DELETE', body);
    }
}
 
export default ContactAPI;