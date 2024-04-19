import MovieService from "../services/movie-service.js";

const classTable = ['table', 'table-bordered', 'table-striped']

class MultipleWinnerElement extends HTMLElement {
  constructor() {
    super();
    this.definitions = {
      movieService: MovieService,
    };
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    const linkCss = document.createElement("link");
    linkCss.rel = "stylesheet";
    linkCss.href = "assets/css/bootstrap.min.css";

    const table = document.createElement('table');
    table.classList.add(...classTable);
    const thead = table.createTHead();
    
    const tableRowHeader = document.createElement('tr');
    const tableColumnHeadYear = document.createElement('th');
    const tableColumnHeadCount = document.createElement('th');

    tableColumnHeadYear.innerText = 'Year';
    tableColumnHeadCount.innerText = 'Win Count';

    tableRowHeader.appendChild(tableColumnHeadYear);
    tableRowHeader.appendChild(tableColumnHeadCount);
    thead.appendChild(tableRowHeader);
    table.appendChild(thead);

    const tbody = table.createTBody();

    const service = this.definitions.movieService;
    service.prototype
      .getMultipeWinnerByYear()
      .then((res) => {
        if (!res.ok) {
          if (res.status === 400) {
            throw new Error(`Bad Request. Cause: ${res}`);
          }
          if (res.status === 401) {
            throw new Error(`Unauthorized`);
          }
          if (res.status === 404) {
            throw new Error(`Not found`);
          }
          if (res.status >= 500) {
            throw new Error(`Internal server error. Cause: ${res}`);
          }
        }
        return res.json();
      })
      .then((data) => {
        const years = data.years;
        years.forEach(item => {
            const tableRow = document.createElement('tr');
            const tableColumnYear = document.createElement('td');
            const tableColumnCount = document.createElement('td');

            tableColumnYear.innerText = item.year;
            tableColumnCount.innerText = item.winnerCount;

            tableRow.appendChild(tableColumnYear);
            tableRow.appendChild(tableColumnCount);
            tbody.appendChild(tableRow);
        });
        
        table.appendChild(tbody);
        shadow.appendChild(table);
        shadow.append(linkCss)
      })
      .catch((err) => console.error(err));
  }
}

customElements.define("multiple-winner", MultipleWinnerElement);
