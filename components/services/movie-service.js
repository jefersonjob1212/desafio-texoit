const url = "https://tools.texoit.com/backend-java/api/movies";

export default class MovieService {
  constructor() {}

  getMultipeWinnerByYear() {
    const getUrl = `${url}?projection=years-with-multiple-winners`;

    return fetch(getUrl);
  }

  getTopWinnerStudios() {
    const getUrl = `${url}?projection=studios-with-win-count`;

    return fetch(getUrl);
  }

  getIntervalProducers() {
    const getUrl = `${url}?projection=max-min-win-interval-for-producers`;

    return fetch(getUrl);
  }

  getFilmsByYear(year) {
    const getUrl = `${url}?winner=true&year=${year}`;

    return fetch(getUrl);
  }

  getListFilms(page = 0, size = 15, winner = "all", year = 0) {
    let getUrl = `${url}?page=${page}&size=${size}`;

    if(winner !== "all") {
      getUrl += `&winner=${winner}`
    }

    if(year > 0) {
      getUrl += `&year=${year}`
    }
    
    return fetch(getUrl);
  }
}