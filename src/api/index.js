import axios from 'axios';

const endpoint = "http://localhost:4000/api/v1";

export default {
  login: (email, password) => {
    return axios.post(`${endpoint}/login`, { email, password });
  },
  addSongRequest: (title, artist, requestedBy) => {
    return axios.post(`${endpoint}/login`, { title, artist, requestedBy});
  },
  getSongRequests: (page, limit, playedStatus = 'all') => {
    let query = '';
    if (playedStatus !== 'all'){
      query+=`&status=${playedStatus}`
    }
    return axios.get(`${endpoint}/requests?page=${page}&limit=${limit}${query}`)
  },
  searchSongRequests: (page, limit, searchTerm, playedStatus = 'all') => {
    let query = '';
    if (playedStatus !== 'all'){
      query+=`&status=${playedStatus}`
    }
    return axios.get(`${endpoint}/requests?page=${page}&limit=${limit}&q=${searchTerm}${query}`)
  },
  togglePlayedStatus: (requestId, hasBeenPlayed = true) => {
    return axios.put(`${endpoint}/requests/${requestId}`, { hasBeenPlayed });
  },
  deleteSongRequest: (requestId) => {
    return axios.delete(`${endpoint}/requests/${requestId}`);
  },
}

