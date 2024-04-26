import MovieService from "../services/movie-service.js";

const classTable = ["table", "table-bordered", "table-striped"];

export default class TopWinnersElement extends HTMLElement {
  constructor() {
    super();
    this.definitions = {
      movieService: MovieService,
    };
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    const linkCss = document.createElement("link");
    linkCss.rel = "stylesheet";
    linkCss.href = "assets/css/bootstrap.min.css";

    const table = document.createElement("table");
    table.classList.add(...classTable);
    const thead = table.createTHead();

    const tableRowHeader = document.createElement("tr");
    const tableColumnHeadStudioName = document.createElement("th");
    const tableColumnHeadCount = document.createElement("th");

    tableColumnHeadStudioName.innerText = "Name";
    tableColumnHeadCount.innerText = "Win Count";

    tableRowHeader.appendChild(tableColumnHeadStudioName);
    tableRowHeader.appendChild(tableColumnHeadCount);
    thead.appendChild(tableRowHeader);
    table.appendChild(thead);

    const tbody = table.createTBody();

    const divTable = document.createElement('div');
    divTable.classList.add('table-responsive');
    divTable.appendChild(table);

    const service = this.definitions.movieService;
    service.prototype
      .getTopWinnerStudios()
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
        const studios = data.studios;
        for (let index = 0; index < 3; index++) {
          const studio = studios[index];
          const tableRow = document.createElement("tr");
          const tableColumnStudioName = document.createElement("td");
          const tableColumnCount = document.createElement("td");

          tableColumnStudioName.innerText = studio.name;
          tableColumnCount.innerText = studio.winCount;

          tableRow.appendChild(tableColumnStudioName);
          tableRow.appendChild(tableColumnCount);
          tbody.appendChild(tableRow);
        }

        table.appendChild(tbody);
        shadow.appendChild(divTable);
        shadow.append(linkCss);
      })
      .catch((err) => console.error(err));
  }
}

customElements.define("top-winner", TopWinnersElement);
