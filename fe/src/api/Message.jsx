import fetchNow from './_Fetch.jsx';

const MessageAPI = {
    /* Send */
    send: (body) => {
        return fetchNow('/message/send', 'POST', body, 'JSON');
    },
    sendMedia: (body) => {
        return fetchNow('/message/media', 'POST', body, 'JSON');
    },
    sendCSV: (body) => {
        return fetchNow('/message/csv', 'POST', body, 'JSON');
    },

    /* Schedule */
    getSchedule: () => {
        return fetchNow('/message/schedule', 'GET');
    },
    updateSchedule: (id, body) => {
        return fetchNow('/message/schedule/' + id, 'PUT', body);
    },
    deleteSchedule: (id) => {
        return fetchNow('/message/schedule/' + id, 'DELETE');
    },

    /* History */
    getHistory: () => {
        return fetchNow('/message/history', 'GET');
    },
    getRecipient: (id) => {
        return fetchNow('/message/' + id + '/recipient', 'GET');
    },
    getRecipientVar: (id) => {
        return fetchNow('/message/var/' + id + '/recipient', 'GET');
    },
    getMedia: (id) => {
        return fetchNow('/message/media/' + id, 'GET');
    }
}
 
export default MessageAPI;