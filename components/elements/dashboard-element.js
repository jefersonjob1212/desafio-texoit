const classListContainer = ["row", "row-cols-2"];

const classColumn = [
  "col-md-6",
  "p-3",
  "mb-3",
  "mt-3",
  "border",
  "bg-body-tertiary",
  "rounded",
];

class DashboardElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    const linkCss = document.createElement("link");
    linkCss.rel = "stylesheet";
    linkCss.href = "assets/css/bootstrap.min.css";

    const scriptMultipleWinner = document.createElement("script");
    scriptMultipleWinner.src = "components/elements/multiple-winner-element.js";
    scriptMultipleWinner.type = "module";

    const scriptTopStudios = document.createElement("script");
    scriptTopStudios.src = "components/elements/top-winners-element.js";
    scriptTopStudios.type = "module";

    const scriptIntervalProducers = document.createElement("script");
    scriptIntervalProducers.src =
      "components/elements/interval-producers-element.js";
    scriptIntervalProducers.type = "module";

    const scriptByYear = document.createElement("script");
    scriptByYear.src = "components/elements/movies-by-year-element.js";
    scriptByYear.type = "module";

    const divContainer = document.createElement('div');
    divContainer.classList.add('container');

    const divRowColsTwo = document.createElement("div");
    divRowColsTwo.classList.add(...classListContainer);

    shadow.append(linkCss);
    shadow.append(scriptMultipleWinner);
    shadow.append(scriptTopStudios);
    shadow.append(scriptIntervalProducers);
    shadow.append(scriptByYear);
    divContainer.appendChild(divRowColsTwo)
    shadow.appendChild(divContainer);

    for (let index = 0; index < 4; index++) {
      const divCol = document.createElement("div");
      divCol.classList.add(...classColumn);
      let title = document.createElement("h5");
      let element = {};

      switch (index) {
        case 0:
          title.innerText = "List years with multiple winners";
          element = document.createElement("multiple-winner");
          break;

        case 1:
          title.innerText = "Top 3 studios with winners";
          element = document.createElement("top-winner");
          break;

        case 2:
          title.innerText =
            "Producers with longest and shortest interval between wins";
          element = document.createElement("interval-producers");
          break;

        case 3:
          title.innerText = "List movie winners by year";
          element = document.createElement("filter-by-year");
          break;

        default:
          break;
      }

      divCol.append(title);
      divCol.appendChild(element);
      divRowColsTwo.appendChild(divCol);
    }
  }
}

customElements.define("dt-dashboard", DashboardElement);
