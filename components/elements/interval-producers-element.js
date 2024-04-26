import MovieService from "../services/movie-service.js";

const classTable = ["table", "table-bordered", "table-striped"];

class IntervalProducersElement extends HTMLElement {
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
        
        shadow.append(linkCss);
    
        //Maximum producer
        const tableMaximum = this.createTable();
    
        const tbodyMaximum = tableMaximum.createTBody();
        
        // Minimum producer
        const tableMinimum = this.createTable();
    
        const tbodyMinimum = tableMinimum.createTBody();

        const pMax = document.createElement('p');
        const pMin = document.createElement('p');

        pMax.classList.add('fs-5');
        pMin.classList.add('fs-5');

        pMax.innerText = 'Maximum';
        pMin.innerText = 'Minimum';

        const divTableMax = document.createElement('div');
        divTableMax.classList.add('table-responsive');
        
        const divTableMin = document.createElement('div');
        divTableMin.classList.add('table-responsive');
    
        const service = this.definitions.movieService;
        service.prototype
          .getIntervalProducers()
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
            const maximum = data.max[0];
            const minimum = data.min[0];
            
            const tableRowMaximum = document.createElement('tr');
            const tableColumnProducerMaximum = document.createElement('td');
            const tableColumnIntervalMaximum = document.createElement('td');
            const tableColumnPreviousMaximum = document.createElement('td');
            const tableColumnFollowingMaximum = document.createElement('td');

            tableColumnProducerMaximum.innerText = maximum.producer;
            tableColumnIntervalMaximum.innerText = maximum.interval;
            tableColumnPreviousMaximum.innerText = maximum.previousWin;
            tableColumnFollowingMaximum.innerText = maximum.followingWin;

            shadow.appendChild(pMax);
            tableRowMaximum.appendChild(tableColumnProducerMaximum);
            tableRowMaximum.appendChild(tableColumnIntervalMaximum);
            tableRowMaximum.appendChild(tableColumnPreviousMaximum);
            tableRowMaximum.appendChild(tableColumnFollowingMaximum);
            tbodyMaximum.appendChild(tableRowMaximum);
            
            tableMaximum.appendChild(tbodyMaximum);
            divTableMax.appendChild(tableMaximum);
            shadow.appendChild(divTableMax);
            
            const tableRowMinimum = document.createElement('tr');
            const tableColumnProducerMinimum = document.createElement('td');
            const tableColumnIntervalMinimum = document.createElement('td');
            const tableColumnPreviousMinimum = document.createElement('td');
            const tableColumnFollowingMinimum = document.createElement('td');

            tableColumnProducerMinimum.innerText = minimum.producer;
            tableColumnIntervalMinimum.innerText = minimum.interval;
            tableColumnPreviousMinimum.innerText = minimum.previousWin;
            tableColumnFollowingMinimum.innerText = minimum.followingWin;

            shadow.appendChild(pMin);
            tableRowMinimum.appendChild(tableColumnProducerMinimum);
            tableRowMinimum.appendChild(tableColumnIntervalMinimum);
            tableRowMinimum.appendChild(tableColumnPreviousMinimum);
            tableRowMinimum.appendChild(tableColumnFollowingMinimum);
            tbodyMinimum.appendChild(tableRowMinimum);
            
            tableMinimum.appendChild(tbodyMinimum);
            divTableMin.appendChild(tableMinimum);
            shadow.appendChild(divTableMin);
          })
          .catch((err) => console.error(err));
      }

      createTable() {
        const table = document.createElement('table');
        table.classList.add(...classTable);
        const thead = table.createTHead();
        
        const tableRowHeader = document.createElement('tr');
        const tableColumnHeadProducer = document.createElement('th');
        const tableColumnHeadInterval = document.createElement('th');
        const tableColumnHeadPrevious = document.createElement('th');
        const tableColumnHeadFollowing = document.createElement('th');
    
        tableColumnHeadProducer.setAttribute("scope", "col");
        tableColumnHeadProducer.innerText = 'Producer';

        tableColumnHeadInterval.setAttribute("scope", "col");
        tableColumnHeadInterval.innerText = 'Interval';

        tableColumnHeadPrevious.setAttribute("scope", "col");
        tableColumnHeadPrevious.innerText = 'Previous Year';

        tableColumnHeadFollowing.setAttribute("scope", "col");
        tableColumnHeadFollowing.innerText = 'Following Year';
    
        tableRowHeader.appendChild(tableColumnHeadProducer);
        tableRowHeader.appendChild(tableColumnHeadInterval);
        tableRowHeader.appendChild(tableColumnHeadPrevious);
        tableRowHeader.appendChild(tableColumnHeadFollowing);

        thead.appendChild(tableRowHeader);
        table.appendChild(thead);
        return table;
      }
}

customElements.define('interval-producers', IntervalProducersElement)