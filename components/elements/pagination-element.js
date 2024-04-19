const classUl = ["pagination", "justify-content-center"];

class PaginationElement extends HTMLElement {
  static observedAttributes = ["current-page", "total-pages"];

  constructor() {
    super();
    this.page = 0;
    this.shadow = this.attachShadow({ mode: "open" });

    this.ulContent = document.createElement("ul");

    this.firstPageEvent = new CustomEvent("firstPage", {
      bubbles: true,
      detail: {
        page: () => 0,
      },
    });

    this.previousPageEvent = new CustomEvent("previousPage", {
      bubbles: true,
      detail: {
        page: () => this.getPage(),
      },
    });

    this.nextPageEvent = new CustomEvent("nextPage", {
      bubbles: true,
      detail: {
        page: () => this.getPage(),
      },
    });

    this.lastPageEvent = new CustomEvent("lastPage", {
      bubbles: true,
      detail: {
        page: () => this.total - 1,
      },
    });

    this.setPageEvent = new CustomEvent("setPage", {
      bubbles: true,
      detail: {
        page: () => this.getPage(),
      },
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "current-page") {
      this.page = newValue;
    } else {
      this.total = newValue;
    }
    this.createItens();
  }

  connectedCallback() {
    const linkCss = document.createElement("link");
    linkCss.rel = "stylesheet";
    linkCss.href = "assets/css/bootstrap.min.css";

    const linkIcons = document.createElement("link");
    linkIcons.rel = "stylesheet";
    linkIcons.href = "assets/css/bootstrap-icons.min.css";

    this.ulContent.classList.add(...classUl);
    this.createItens();
    this.shadow.append(linkCss);
    this.shadow.append(linkIcons);

    const navPagination = document.createElement("nav");
    navPagination.appendChild(this.ulContent);
    this.shadow.appendChild(navPagination);
  }

  createItens() {
    this.ulContent.innerHTML = "";
    let li = document.createElement("li");
    li.classList.add("page-item");
    if (Number(this.page) === 0) {
      li.classList.add("disabled");
    }
    li.innerHTML =
      '<a class="page-link"><i class="bi-rewind-fill"></i>&nbsp;</a>';
    li.addEventListener("click", (evt) => {
      if (!evt.target.classList.contains("disabled")) {
        this.page = 0;
        this.createItens();
        this.dispatchEvent(this.nextPageEvent);
      }
    });
    this.ulContent.appendChild(li);

    li = document.createElement("li");
    li.classList.add("page-item");

    if (Number(this.page) === 0) {
      li.classList.add("disabled");
    }
    li.innerHTML =
      '<a class="page-link"><i class="bi-caret-left-fill"></i>&nbsp;</a>';
    li.addEventListener("click", (evt) => {
      if (!evt.target.classList.contains("disabled")) {
        this.page--;
        this.createItens();
        this.dispatchEvent(this.previousPageEvent);
      }
    });

    this.ulContent.appendChild(li);

    const limitSize = 4;
    let lastPageNumber = 4;
    let firstPageNumber = 0;
    if (this.total < 5) {
      lastPageNumber = this.total - 1;
    } else if(this.page > limitSize) {
      const quociente = Math.trunc(this.page / 5);    
      firstPageNumber = limitSize * quociente
      firstPageNumber++;
      lastPageNumber *= quociente + 1;
      lastPageNumber += 1;
      if (lastPageNumber > this.total) {
        const difference = lastPageNumber - this.total;
        lastPageNumber -= difference;
      }
    }

    for (let index = firstPageNumber; index <= lastPageNumber; index++) {
      li = document.createElement("li");
      li.classList.add("page-item");
      if (Number(this.page) === index) {
        li.classList.add("active");
      }
      li.innerHTML = `<a class="page-link">${index + 1}</a>`;

      li.addEventListener("click", (evt) => {
        if (!evt.target.classList.contains("disabled")) {
          this.page = index;
          this.createItens();
          this.dispatchEvent(this.setPageEvent);
        }
      });

      this.ulContent.appendChild(li);
    }

    li = document.createElement("li");
    li.classList.add("page-item");
    if (
      Number(this.page) + 1 === Number(this.total) ||
      Number(this.total) === 1
    ) {
      li.classList.add("disabled");
    }
    li.innerHTML =
      '<a class="page-link"><i class="bi-caret-right-fill"></i>&nbsp;</a>';
    li.addEventListener("click", (evt) => {
      if (!evt.target.classList.contains("disabled")) {
        this.page++;
        this.createItens();
        this.dispatchEvent(this.nextPageEvent);
      }
    });
    this.ulContent.appendChild(li);

    li = document.createElement("li");
    li.classList.add("page-item");
    if (
      Number(this.page) + 1 === Number(this.total) ||
      Number(this.total) === 1
    ) {
      li.classList.add("disabled");
    }
    li.innerHTML =
      '<a class="page-link"><i class="bi-fast-forward-fill"></i>&nbsp;</a>';
    li.addEventListener("click", (evt) => {
      if (!evt.target.classList.contains("disabled")) {
        this.page = this.total - 1;
        this.createItens();
        this.dispatchEvent(this.lastPageEvent);
      }
    });
    this.ulContent.appendChild(li);
  }

  getPage() {
    return this.page;
  }
}

customElements.define("el-pagination", PaginationElement);
