import { html, fixture, expect } from '@open-wc/testing';

import '../../components/elements/dashboard-element';

describe('Dashboard', () => {
  it('Tem que ter uma classe com grid.', async () => {
    const el = await fixture(html`<dt-dashboard></dt-dashboard>`);

    const arrayClass = [];
    const classListGrid = el.shadowRoot.children[5].children[0].classList;
    for (let index = 0; index < classListGrid.length; index++) {
        arrayClass[index] = classListGrid[index];
    }
    const countLength = classListGrid.length;

    expect(countLength).to.equal(2);
    expect(arrayClass).to.contains('row');
    expect(arrayClass).to.contains('row-cols-2');
  });

  it('Verificar se o componente multiple-winner foi criado.', async () => {
    const el = await fixture(html`<dt-dashboard></dt-dashboard>`);

    const cols = el.shadowRoot.children[5].children[0];

    const contents = cols.children[0].children;
    const array = [];

    for (let index = 0; index < contents.length; index++) {
        array[index] = contents[index];
    }

    expect(array[0].tagName.toLowerCase()).to.contains('h5');
    expect(array[1].tagName.toLowerCase()).to.contains('multiple-winner');
  });

  it('Verificar se o componente top-winner foi criado.', async () => {
    const el = await fixture(html`<dt-dashboard></dt-dashboard>`);

    const cols = el.shadowRoot.children[5].children[0];

    const contents = cols.children[1].children;
    const array = [];

    for (let index = 0; index < contents.length; index++) {
        array[index] = contents[index];
    }

    expect(array[0].tagName.toLowerCase()).to.contains('h5');
    expect(array[1].tagName.toLowerCase()).to.contains('top-winner');
  });

  it('Verificar se o componente interval-producers foi criado.', async () => {
    const el = await fixture(html`<dt-dashboard></dt-dashboard>`);

    const cols = el.shadowRoot.children[5].children[0];

    const contents = cols.children[2].children;
    const array = [];

    for (let index = 0; index < contents.length; index++) {
        array[index] = contents[index];
    }

    expect(array[0].tagName.toLowerCase()).to.contains('h5');
    expect(array[1].tagName.toLowerCase()).to.contains('interval-producers');
  });

  it('Verificar se o componente top-winner foi criado.', async () => {
    const el = await fixture(html`<dt-dashboard></dt-dashboard>`);

    const cols = el.shadowRoot.children[5].children[0];

    const contents = cols.children[3].children;
    const array = [];

    for (let index = 0; index < contents.length; index++) {
        array[index] = contents[index];
    }

    expect(array[0].tagName.toLowerCase()).to.contains('h5');
    expect(array[1].tagName.toLowerCase()).to.contains('filter-by-year');
  });
});