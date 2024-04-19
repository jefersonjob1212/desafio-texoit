class NavbarElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });

        const linkCss = document.createElement('link');
        linkCss.rel = 'stylesheet';
        linkCss.href = 'assets/css/bootstrap.min.css';

        const nav = document.createElement('nav');
        nav.setAttribute('class', 'navbar bg-dark border-bottom border-body');
        nav.setAttribute('data-bs-theme', 'dark');

        const div = document.createElement('div');
        div.classList.add('container-fluid');

        const a = document.createElement('a');
        a.setAttribute('class', 'navbar-brand');
        a.setAttribute('href', '#');
        a.innerText = 'The Rapsberry Awards';

        const buttonToggle = document.createElement('button');
        buttonToggle.type = 'button';
        buttonToggle.setAttribute('class', 'navbar-toggler');
        buttonToggle.setAttribute('data-bs-toggle', 'collapse');
        buttonToggle.setAttribute('data-bs-target', '#navbarSupportedContent');
        buttonToggle.setAttribute('aria-controls', 'navbarSupportedContent');
        buttonToggle.setAttribute('aria-expanded', false);

        const spanToggleIcon = document.createElement('span');
        spanToggleIcon.setAttribute('class', 'navbar-toggler-icon');
        
        shadow.append(linkCss);
        shadow.appendChild(nav);
        nav.appendChild(div);
        div.appendChild(a);
        div.appendChild(buttonToggle);
        buttonToggle.appendChild(spanToggleIcon);
    }
}

customElements.define("nav-bar", NavbarElement)