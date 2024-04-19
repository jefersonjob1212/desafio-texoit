import { html, fixture, expect } from "@open-wc/testing";
import { getIntervalProducers } from "./interval-producers.mock";

describe("IntervalProducersElement", () => {
  it("Elemento foi criado.", async () => {
    const el = await fixture(html`
      <interval-producers></interval-producers>
    `);   
    expect(el).not.to.be.null;
  });

  it("Shadow foi renderizado.", async () => {
    const el = await fixture(html`
      <interval-producers></interval-producers>
    `);

    expect(el).shadowDom.to.be.accessible();
  });

  it('calls getIntervalProducers', async () =>  {
    await getIntervalProducers();
    expect(getIntervalProducers.callCount).to.equal(1);
  });
});
