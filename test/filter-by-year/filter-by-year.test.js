import { html, fixture, expect } from "@open-wc/testing";
import { getFilmsByYear } from "./filter-by-year.mock";

describe("IntervalProducersElement", () => {
  it("Elemento foi criado.", async () => {
    const el = await fixture(html`
      <filter-by-year></filter-by-year>
    `);   
    expect(el).not.to.be.null;
  });

  it("Shadow foi renderizado.", async () => {
    const el = await fixture(html`
      <filter-by-year></filter-by-year>
    `);

    expect(el).shadowDom.to.be.accessible();
  });

  it('calls getFilmsByYear', async () =>  {
    await getFilmsByYear();
    expect(getFilmsByYear.callCount).to.equal(1);
  });
});
