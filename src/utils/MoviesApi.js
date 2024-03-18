class MoviesApi {
  constructor(option) {
    this._baseUrl = option.baseUrl;
    this._headers = option.headers;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, option) {
    return fetch(url, option).then(this._checkResponse);
  }

  getMovies() {
    return this._request(`${this._baseUrl}/beatfilm-movies`, {
      method: 'GET',
      headers: this._headers,
    });
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default moviesApi;
