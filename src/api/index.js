import axios from 'axios';
import config from '../utils/config'

const endpoint = `${config.baseUrl}/api/v1`;

export default {
  login: (email, password) => {
    return axios.post(`${endpoint}/login`, { email, password });
  },
  addSongRequest: ({title, artist, requestedBy}) => {
    return axios.post(`${endpoint}/requests`, { title, artist, requestedBy});
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
  updateSongRequest: (requestId, data) => {
    return axios.patch(`${endpoint}/requests/${requestId}`, data);
  },
  deleteSongRequest: (requestId) => {
    return axios.delete(`${endpoint}/requests/${requestId}`);
  },
  getPerformances: (page, limit) => {
    return axios.get(`${endpoint}/performances?page=${page}&limit=${limit}`)
  },
  searchPerformances: (page, limit, searchTerm, genre) => {
    let query = '', search = '';
    if (genre){
      query+=`&genres=${genre}`
    }
    if(searchTerm){
      search+=`&q=${searchTerm}`
    }
    const url = new URL(`${endpoint}/performances/search?page=${page}&limit=${limit}${search}${query}`)
    return axios.get(url.href)
  },
  updatePerformance: (id, data) => {
    return axios.put(`${endpoint}/performances/${id}`, data)
  },
  getGenres: () => {
    return axios.get(`${endpoint}/performances/genres`)
  }
}

