import MovieService from "../services/movie-service.js";

const classContainer = [
  "container",
  "border",
  "border-dark-subtle",
  "mt-3",
  "rounded",
];
const classTable = ["table", "table-bordered", "table-striped"];

const optionsFilterDropDown = [
  {
    label: "Yes/No",
    value: "all",
  },
  {
    label: "Yes",
    value: "true",
  },
  {
    label: "No",
    value: "false",
  },
];

class ListMoviesElement extends HTMLElement {
  constructor() {
    super();
    this.definitions = {
      movieService: MovieService,
    };
    this.page = 0;
    this.pageSize = 15;
    this.shadow = this.attachShadow({ mode: "open" });
    this.totalPages = 0;
    this.pagination = document.createElement('el-pagination');
    
    this.pagination.addEventListener('firstPage', (evt) => {
      this.page = evt.detail.page();
      console.log(this.page)
      this.applyFilter();
    })
    
    this.pagination.addEventListener('previousPage', (evt) => {
      this.page = evt.detail.page();
      console.log(this.page)
      this.applyFilter();
    })
    
    this.pagination.addEventListener('nextPage', (evt) => {
      this.page = evt.detail.page();
      console.log(this.page)
      this.applyFilter();
    })
    
    this.pagination.addEventListener('lastPage', (evt) => {
      this.page = evt.detail.page();
      console.log(this.page)
      this.applyFilter();
    })
    
    this.pagination.addEventListener('setPage', (evt) => {
      this.page = evt.detail.page();
      console.log(this.page)
      this.applyFilter();
    })
  }

  connectedCallback() {
    const linkCss = document.createElement("link");
    linkCss.rel = "stylesheet";
    linkCss.href = "assets/css/bootstrap.min.css";

    const scriptPagination = document.createElement("script");
    scriptPagination.src = "components/elements/pagination-element.js";
    scriptPagination.type = "module";

    this.shadow.append(scriptPagination);

    const container = document.createElement("div");
    container.classList.add(...classContainer);
    const title = document.createElement("h4");
    title.innerText = "List Movies";

    this.createTable();

    this.shadow.append(linkCss);

    container.appendChild(title);
    container.appendChild(this.table);
    this.shadow.appendChild(container);

    this.applyFilter();
  }

  createTable() {
    this.table = document.createElement("table");
    this.table.classList.add(...classTable);

    const thead = this.table.createTHead();
    thead.classList.add(...['text-center', 'align-middle']);
    const rowHead = document.createElement("tr");
    const columnId = document.createElement("th");
    const columnYear = document.createElement("th");
    const columnTitle = document.createElement("th");
    const columnIsWinner = document.createElement("th");

    columnId.innerText = "ID";
    columnTitle.innerText = "Title";

    const yearElement = document.createElement("input");
    yearElement.type = "number";
    yearElement.placeholder = "Filter by year";
    yearElement.maxLength = 4;
    yearElement.classList.add('form-control')
    yearElement.addEventListener("input", (evt) => {
      const value = evt.target.value;
      if (value.length === 4 || value.length === 0) {
        this.filterYear = value;
        this.page = 0;
        this.applyFilter();
      }
    });

    const pYear = document.createElement('p');
    pYear.innerText = 'Year'
    pYear.setAttribute('class', 'mb-3');

    columnYear.appendChild(pYear);
    columnYear.appendChild(yearElement);

    const winnerElement = document.createElement("select");
    winnerElement.classList.add('form-control')
    winnerElement.addEventListener("change", (evt) => {
      this.filterWinner = evt.target.value;
      this.applyFilter();
    });

    const pWinner = document.createElement('p');
    pWinner.innerText = 'Winner?';
    pWinner.setAttribute('class', 'mb-3');

    columnIsWinner.appendChild(pWinner);
    columnIsWinner.appendChild(winnerElement);

    for (let index = 0; index < optionsFilterDropDown.length; index++) {
      const item = optionsFilterDropDown[index];
      const option = document.createElement("option");
      option.value = item.value;
      option.text = item.label;
      winnerElement.appendChild(option);
    }

    rowHead.appendChild(columnId);
    rowHead.appendChild(columnYear);
    rowHead.appendChild(columnTitle);
    rowHead.appendChild(columnIsWinner);

    thead.appendChild(rowHead);
    this.table.appendChild(thead);
    this.tbody = this.table.createTBody();
    this.table.appendChild(this.tbody);

    const footer = this.table.createTFoot();
    const rowFoot = document.createElement('tr');
    const columnFoot = document.createElement('td');
    columnFoot.colSpan = 4;
    this.pagination.setAttribute('total-pages', this.totalPages);

    rowFoot.appendChild(columnFoot);
    footer.appendChild(rowFoot);
    this.table.appendChild(footer);
    columnFoot.appendChild(this.pagination);
  }

  applyFilter() {
    this.tbody.innerHTML = '';
    if(!this.filterWinner) {
      this.filterWinner = "all";
    }
    if(!this.filterYear) {
      this.filterYear = 0;
    }
    this.definitions.movieService.prototype
      .getListFilms(
        this.page,
        this.pageSize,
        this.filterWinner,
        this.filterYear
      )
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
        const dataArray = data.content;
        this.totalPages = data.totalPages;

        for (let index = 0; index < dataArray.length; index++) {
            const item = dataArray[index];
            const row = document.createElement('tr');

            const columnId = document.createElement('td');
            const columnYear = document.createElement('td');
            const columnTitle = document.createElement('td');
            const columnIsWinner = document.createElement('td');

            columnId.innerText = item.id;
            columnYear.innerText = item.year;
            columnTitle.innerText = item.title;
            columnIsWinner.innerText = item.winner ? "Yes" : "No";

            row.appendChild(columnId);
            row.appendChild(columnYear);
            row.appendChild(columnTitle);
            row.appendChild(columnIsWinner);

            this.tbody.appendChild(row);
            this.pagination.setAttribute('total-pages', this.totalPages);
            this.pagination.setAttribute('current-page', this.page);
        }
      })
      .catch((err) => console.error(err));
  }
}

customElements.define("list-movies", ListMoviesElement);
