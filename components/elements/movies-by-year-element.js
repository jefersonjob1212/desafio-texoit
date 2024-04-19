import MovieService from "../services/movie-service.js";

const classTable = ["table", "table-bordered", "table-striped"];
const classButton = ["btn", "btn-primary"];

class MoviesByYearElement extends HTMLElement {
  constructor() {
    super();
    this.definitions = {
      movieService: MovieService,
    };

    this.filterValue = '';

    this.table = document.createElement("table");
    this.table.classList.add(...classTable);
    const thead = this.table.createTHead();

    const tableRowHeader = document.createElement("tr");
    const tableColumnHeadId = document.createElement("th");
    const tableColumnHeadYear = document.createElement("th");
    const tableColumnHeadTitle = document.createElement("th");

    tableColumnHeadId.innerText = "Id";
    tableColumnHeadYear.innerText = "Year";
    tableColumnHeadTitle.innerText = "Title";

    tableRowHeader.appendChild(tableColumnHeadId);
    tableRowHeader.appendChild(tableColumnHeadYear);
    tableRowHeader.appendChild(tableColumnHeadTitle);
    thead.appendChild(tableRowHeader);
    this.table.appendChild(thead);
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    const linkCss = document.createElement("link");
    linkCss.rel = "stylesheet";
    linkCss.href = "assets/css/bootstrap.min.css";

    const linkIcons = document.createElement("link");
    linkIcons.rel = "stylesheet";
    linkIcons.href = "assets/css/bootstrap-icons.min.css";

    const title = document.createElement("h3");
    title.innerText = "List movie winners by year";

    const divFilter = document.createElement("div");
    divFilter.classList.add(...["row", "align-items-center", "mb-3"]);

    const divInput = document.createElement("div");
    divInput.classList.add(...["col-md-10", "col-sm-10", "col-lg-10"]);

    const divButton = document.createElement("div");
    divButton.classList.add(...["col-md-2", "col-sm-2", "col-lg-2"]);

    const input = document.createElement("input");
    input.type = "number";
    input.maxLength = 4;
    input.placeholder = "Search by year";
    input.classList.add("form-control");
    input.addEventListener('input', (event) => this.filterValue = event.target.value)

    const buttonSearch = document.createElement("button");
    buttonSearch.classList.add(...classButton);
    buttonSearch.innerHTML = '<i class="bi-search"</i>';

    const tbody = this.table.createTBody();
    this.table.appendChild(tbody);

    buttonSearch.addEventListener("click", () => {
      const tbodyChild = this.table.children.item(1);
      if(tbodyChild.childNodes.length > 0)  {
        tbodyChild.innerHTML = '';
      }
      this.definitions.movieService.prototype
        .getFilmsByYear(this.filterValue)
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
          const bodyRow = document.createElement('tr');
          const columnId = document.createElement('td');
          const columnYear = document.createElement('td');
          const columnTitle = document.createElement('td');

          const movie = data[0];
          columnId.innerText = movie.id;
          columnYear.innerText = movie.year;
          columnTitle.innerText = movie.title;
          
          bodyRow.appendChild(columnId);
          bodyRow.appendChild(columnYear);
          bodyRow.appendChild(columnTitle);

          tbody.appendChild(bodyRow);
        })
        .catch();
    });

    divInput.appendChild(input);
    divButton.appendChild(buttonSearch);
    divFilter.appendChild(divInput);
    divFilter.appendChild(divButton);

    shadow.append(linkCss);
    shadow.append(linkIcons);

    shadow.appendChild(divFilter);
    shadow.appendChild(this.table);
  }
}

customElements.define("filter-by-year", MoviesByYearElement);
