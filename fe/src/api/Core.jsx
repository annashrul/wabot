import fetchNow from './_Fetch.jsx';

const CoreAPI = {
    getContact: (id) => {
        return fetchNow('/contactWA/' + id, 'GET');
    },
    getGroup: (id) => {
        return fetchNow('/groupWA/' + id, 'GET');
    },
    getBroadcast: (id) => {
        return fetchNow('/broadcastWA/' + id, 'GET');
    },
    getTotal: () => {
        return fetchNow('/total', 'GET');
    },

    syncContact: (id) => {
        return fetchNow('/syncContactWA/' + id, 'GET');
    },
    syncGroup: (id) => {
        return fetchNow('/syncGroupWA/' + id, 'GET');
    },
    syncBroadcast: (id) => {
        return fetchNow('/syncBroadcastWA/' + id, 'GET');
    }
}
 
export default CoreAPI;