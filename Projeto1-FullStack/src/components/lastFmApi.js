const API_KEY = '56020db1940ca30626c5479dee40b53c'; // Chave pública do Last.Fm
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

class LastFmApiService {
  async fetchFromApi(method, user, additionalParams = '') {
    const url = `${BASE_URL}?method=${method}&user=${user}&api_key=${API_KEY}&format=json${additionalParams}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.message || 'Erro na API do Last.fm');
      }
      
      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Erro de conexão');
    }
  }

  async getUserInfo(username) {
    const data = await this.fetchFromApi('user.getInfo', username);
    if (!data.user) {
      throw new Error('Usuário não encontrado');
    }
    return data.user;
  }

  async getRecentTracks(username, limit = 1) {
    const data = await this.fetchFromApi('user.getRecentTracks', username, `&limit=${limit}`);
    if (!data.recenttracks || !data.recenttracks.track) {
      return [];
    }
    return Array.isArray(data.recenttracks.track) ? data.recenttracks.track : [data.recenttracks.track];
  }

  async getTopArtists(username, limit = 5) {
    const data = await this.fetchFromApi('user.getTopArtists', username, `&limit=${limit}&period=overall`);
    if (!data.topartists || !data.topartists.artist) {
      return [];
    }
    return Array.isArray(data.topartists.artist) ? data.topartists.artist : [data.topartists.artist];
  }
}

export const lastFmApi = new LastFmApiService();