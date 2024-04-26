const stylesSideBar = [
  "nav", "nav-pills", "flex-sm-column", "flex-row", "mb-auto", "justify-content-between", "text-truncate"
];

const stylesUnmarkedList = ["nav", "nav-pills", "flex-column", "mb-auto"];

class SideBarElement extends HTMLElement {
  constructor() {
    super();
    this.navigationItens = "";
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    const linkCss = document.createElement("link");
    linkCss.rel = "stylesheet";
    linkCss.href = "assets/css/bootstrap.min.css";

    const linkIcons = document.createElement("link");
    linkIcons.rel = "stylesheet";
    linkIcons.href = "assets/css/bootstrap-icons.min.css";

    const divContent = document.createElement("div");
    divContent.classList.add(...stylesSideBar);

    const unMarkedList = document.createElement("ul");
    unMarkedList.classList.add(...stylesUnmarkedList);

    shadow.append(linkCss);
    shadow.append(linkIcons);
    shadow.appendChild(divContent);
    divContent.appendChild(unMarkedList);
    if (!this.navigationItens) {
      fetch("../components/constants/itens-navbar.json")
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
          this.dataArray = data;
          this.dataArray.forEach((element, index) => {
            const li = document.createElement("li");
            li.classList.add("nav-item");
            // li.classList.add("col-sm-3");
            li.id = element.description;

            const button = document.createElement("button");
            button.classList.add("nav-link");
            button.setAttribute('style', 'white-space: normal !important')

            if (index === 0) button.classList.add("active");

            button.ariaCurrent = "page";
            button.ariaLabel = element.key;
            button.innerHTML = `<i class="${element.icon}"></i>&nbsp;${element.description}`;

            button.addEventListener("click", (e) => {
              this.clickItemSideNav(e);
            });

            unMarkedList.appendChild(li);
            li.appendChild(button);
          });
        });
    }
  }

  clickItemSideNav(event) {
    const element = event.target;
    if (!element.classList.contains("active")) {
      element.classList.add("active");
      const others = element.parentElement.parentElement.children;

      for (let index = 0; index < others.length; index++) {
        const li = others[index];
        if (element.parentElement.id !== li.id)
          li.children[0].classList.remove("active");
      }
    }
  }
}

customElements.define("side-bar", SideBarElement);
