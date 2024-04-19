import { html, fixture, expect } from "@open-wc/testing";
import { getListFilms } from "./list-movies.mock";

describe("ListMoviesElement", () => {
  it("Elemento foi criado.", async () => {
    const el = await fixture(html`
      <list-movies></list-movies>
    `);   
    expect(el).not.to.be.null;
  });

  it("Shadow foi renderizado.", async () => {
    const el = await fixture(html`
      <list-movies></list-movies>
    `);

    expect(el).shadowDom.to.be.accessible();
  });

  it('calls getMultipeWinnerByYear', async () =>  {
    await getListFilms();
    expect(getListFilms.callCount).to.equal(1);
  });
});
