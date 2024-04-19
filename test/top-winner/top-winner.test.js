import { html, fixture, expect } from "@open-wc/testing";
import { getTopWinner } from "./top-winner.mock";

describe("TopWinner", () => {
  it("Elemento foi criado.", async () => {
    const el = await fixture(html`
      <top-winner></top-winner>
    `);   
    expect(el).not.to.be.null;
  });

  it("Shadow foi renderizado.", async () => {
    const el = await fixture(html`
      <top-winner></top-winner>
    `);

    expect(el).shadowDom.to.be.accessible();
  });

  it('calls getTopWinner', async () =>  {
    await getTopWinner();
    expect(getTopWinner.callCount).to.equal(1);
  });
});
