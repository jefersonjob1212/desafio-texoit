import MovieService from "../services/movie-service.js";

const classTable = ['table', 'table-bordered', 'table-striped']

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
        const tableMaximum = document.createElement('table');
        tableMaximum.classList.add(...classTable);
        const theadMaximum = tableMaximum.createTHead();
        
        const tableRowHeaderMaximum = document.createElement('tr');
        const tableColumnHeadProducerMaximum = document.createElement('th');
        const tableColumnHeadIntervalMaximum = document.createElement('th');
        const tableColumnHeadPreviousMaximum = document.createElement('th');
        const tableColumnHeadFollowingMaximum = document.createElement('th');
    
        tableColumnHeadProducerMaximum.innerText = 'Producer';
        tableColumnHeadIntervalMaximum.innerText = 'Interval';
        tableColumnHeadPreviousMaximum.innerText = 'Previous Year';
        tableColumnHeadFollowingMaximum.innerText = 'Following Year';
    
        tableRowHeaderMaximum.appendChild(tableColumnHeadProducerMaximum);
        tableRowHeaderMaximum.appendChild(tableColumnHeadIntervalMaximum);
        tableRowHeaderMaximum.appendChild(tableColumnHeadPreviousMaximum);
        tableRowHeaderMaximum.appendChild(tableColumnHeadFollowingMaximum);

        theadMaximum.appendChild(tableRowHeaderMaximum);
        tableMaximum.appendChild(theadMaximum);
    
        const tbodyMaximum = tableMaximum.createTBody();
        
        // Minimum producer
        const tableMinimum = document.createElement('table');
        tableMinimum.classList.add(...classTable);
        const theadMinimum = tableMinimum.createTHead();
        
        const tableRowHeaderMinimum = document.createElement('tr');
        const tableColumnHeadProducerMinimum = document.createElement('th');
        const tableColumnHeadIntervalMinimum = document.createElement('th');
        const tableColumnHeadPreviousMinimum = document.createElement('th');
        const tableColumnHeadFollowingMinimum = document.createElement('th');
    
        tableColumnHeadProducerMinimum.innerText = 'Producer';
        tableColumnHeadIntervalMinimum.innerText = 'Interval';
        tableColumnHeadPreviousMinimum.innerText = 'Previous Year';
        tableColumnHeadFollowingMinimum.innerText = 'Following Year';
       
        tableRowHeaderMinimum.appendChild(tableColumnHeadProducerMinimum);
        tableRowHeaderMinimum.appendChild(tableColumnHeadIntervalMinimum);
        tableRowHeaderMinimum.appendChild(tableColumnHeadPreviousMinimum);
        tableRowHeaderMinimum.appendChild(tableColumnHeadFollowingMinimum);
        theadMinimum.appendChild(tableRowHeaderMinimum);
        tableMinimum.appendChild(theadMinimum);
    
        const tbodyMinimum = tableMinimum.createTBody();

        const pMax = document.createElement('p');
        const pMin = document.createElement('p');

        pMax.classList.add('fs-5');
        pMin.classList.add('fs-5');

        pMax.innerText = 'Maximum';
        pMin.innerText = 'Minimum';
    
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
            shadow.appendChild(tableMaximum);
            
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
            shadow.appendChild(tableMinimum);
          })
          .catch((err) => console.error(err));
      }
}

customElements.define('interval-producers', IntervalProducersElement)