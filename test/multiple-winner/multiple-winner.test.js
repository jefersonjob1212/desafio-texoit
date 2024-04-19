import { html, fixture, expect } from "@open-wc/testing";
import { getMultipeWinnerByYear } from "./multiple-winner.mock";

describe("MultipleWinnerElement", () => {
  it("Elemento foi criado.", async () => {
    const el = await fixture(html`
      <multiple-winner></multiple-winner>
    `);   
    expect(el).not.to.be.null;
  });

  it("Shadow foi renderizado.", async () => {
    const el = await fixture(html`
      <multiple-winner></multiple-winner>
    `);

    expect(el).shadowDom.to.be.accessible();
  });

  it('calls getMultipeWinnerByYear', async () =>  {
    await getMultipeWinnerByYear();
    expect(getMultipeWinnerByYear.callCount).to.equal(1);
  });
});
