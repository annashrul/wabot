import fetchNow from './_Fetch.jsx';

const MediaAPI = {
    upload: (body) => {
        return fetchNow('/message/media/upload', 'POST', body, 'form-data');
    }
}
 
export default MediaAPI;