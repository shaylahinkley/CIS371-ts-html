import * as chai from "chai";
import "chai-dom";
import { atomNames, atomObjects, Atom } from "./mydata";
const expect = chai.expect;

/* This function is called at the very END of the test run */
after(() => {
  mocha.suite.suites.forEach((s: Mocha.Suite) => {
    const failures = s.tests.filter((t: Mocha.Test) => {
      const isExtra = t.title.indexOf("EXTRA CREDIT") >= 0;
      if (isExtra) console.log("it's title", t.title);
      return t.state == "failed" && !isExtra;
    });
    const id = s.title.replace("-", "").toLowerCase();
    console.log("<div> ", id, "failed count", failures.length);
    const dd = document.getElementById(id);
    dd?.classList.add(failures.length > 0 ? "FAIL" : "OK");
  });

  console.log("Checking user styles");
  let heavyClassFound = false;
  let lightClassFound = false;
  for (let k = 0; k < document.styleSheets.length; k++) {
    const ss = document.styleSheets[k];
    if (ss.href && ss.href.indexOf("https://unpkg.com") >= 0) continue;
    // console.log(ss);
    if (ss.cssRules) {
      for (let m = 0; m < ss.cssRules.length; m++) {
        const ruleList = ss.cssRules[m] as CSSStyleRule;
        // console.log(ruleList.selectorText);
        if (ruleList.selectorText.match(/heavy$/)) heavyClassFound = true;
        if (ruleList.selectorText.match(/light$/)) lightClassFound = true;
      }
    }
  }
  if (!heavyClassFound || !lightClassFound)
    expect.fail("Missing .heavy and .light class definition in your .CSS file");
});
describe("Part-0", () => {
  let top: HTMLElement | null;
  before(() => {
    top = document.getElementById("part0");
  });

  it("has top-level <div>", () => {
    expect(top).to.exist;
  });
  it("shows the correct text", () => {
    const para = top?.querySelector("p");
    expect(para).to.be.exist;
    expect(para?.textContent).to.contain("This work is solely mine");
    expect(para?.textContent).to.contain("academic honesty");
  });
  it("show emphasis (EXTRA CREDIT)", () => {
    const useBold = top?.querySelector("p > b");
    const useEm = top?.querySelector("p > b");
    const extraPara = document.createElement("p");
    const extraText = document.createTextNode("*** Extra Credit");
    const where = top?.querySelector("h2 ~ p");
    console.log("insert before", where);
    extraPara.appendChild(extraText);
    if (useBold) {
      expect(useBold.textContent).to.equal("violation");
      top!!.appendChild(extraPara);
    } else {
      expect(useEm?.textContent).to.equal("violation");
      top!!.appendChild(extraPara);
    }
  });
});

describe("Part-1", () => {
  let top: HTMLElement | null;
  before(() => {
    top = document.getElementById("part1");
  });
  it("has top-level <div>", () => {
    expect(top).to.exist;
  });
  it("uses <ol>", () => {
    expect(top?.querySelector("ol")).to.exist;
  });
  it("display the correct number of list items", () => {
    const rows = top?.querySelectorAll("ol > li");
    expect(rows).to.exist;
    expect(rows?.length).to.be.equal(atomNames.length);
  });
  it("displays all the atom names in the array", () => {
    const rows = top?.querySelectorAll("ol > li");
    expect(rows).to.exist;
    expect(rows?.length).to.be.equal(atomNames.length);
    if (rows?.length) {
      for (let k = 0; k < rows.length; k++) {
        expect(rows[k].textContent).to.contain(atomNames[k]);
      }
    }
  });
});

describe("Part-2", () => {
  let top: HTMLElement | null;
  before(() => {
    top = document.getElementById("part2");
  });
  it("has top-level <div>", () => {
    expect(top).to.exist;
  });
  it("uses <ol>", () => {
    expect(top?.querySelector("ol")).to.exist;
  });
  it("displays the correct number of list items", () => {
    const rows = top?.querySelectorAll("ol > li");
    expect(rows).to.exist;
    expect(rows?.length).to.be.equal(atomObjects.length);
  });

  it("shows all the atom names in the array", () => {
    const rows = top?.querySelectorAll("ol > li");
    expect(rows).to.exist;
    expect(rows?.length).to.be.equal(atomObjects.length);
    if (rows?.length) {
      for (let k = 0; k < rows.length; k++) {
        const a: Atom = atomObjects[k];
        expect(rows[k].textContent).to.contain(a.name);
      }
    }
  });
  it("displays atomic weight", () => {
    const rows = top?.querySelectorAll("ol > li");
    expect(rows).to.exist;
    expect(rows?.length).to.be.equal(atomObjects.length);
    if (rows?.length) {
      for (let k = 0; k < rows.length; k++) {
        const a: Atom = atomObjects[k];
        expect(rows[k].textContent).to.match(/\( *weight *:/);
        expect(rows[k].textContent).to.contain(a.weight.toString());
      }
    }
  });
  it("uses .heavy and .light class", () => {
    const rows = top?.querySelectorAll("ol > li");
    expect(rows).to.exist;
    expect(rows?.length).to.be.equal(atomObjects.length);
    if (rows?.length) {
      for (let k = 0; k < rows.length; k++) {
        const a: Atom = atomObjects[k];
        expect(rows[k].classList.contains(a.weight > 150 ? "heavy" : "light"))
          .to.be.true;
      }
    }
  });
});

describe("Part-3", () => {
  let top: HTMLElement | null;
  before(() => {
    top = document.getElementById("part3");
  });
  it("has top-level <div>", () => {
    expect(top).to.exist;
  });

  it("defines a <table>", () => {
    expect(top?.querySelector("table")).to.exist;
  });
  it("used <thead> for the header row", () => {
    expect(top?.querySelector("table > thead")).to.exist;
  });
  it("used <tbody> for the table data", () => {
    expect(top?.querySelector("table > tbody")).to.exist;
  });
  it("has one header row", () => {
    const numHeaderRows = top?.querySelectorAll("table > thead > tr");
    expect(numHeaderRows?.length).to.equals(1);
  });
  it("has 2-column header cells with <th> and correct text", () => {
    const headerCols = top?.querySelectorAll("table > thead > tr > th");
    expect(headerCols?.length).to.equals(2);
    if (headerCols) {
      expect(headerCols[0].textContent).to.contain("Atom");
      expect(headerCols[1].textContent).to.contain("Weight");
    }
  });
  it("has the correct number of data rows", () => {
    const dataRows = top?.querySelectorAll("table > tbody > tr");
    const dataCells = top?.querySelectorAll("table > tbody > tr > td");
    expect(dataRows?.length).to.equals(atomObjects.length);
    expect(dataCells?.length).to.equal(atomObjects.length * 2);
  });
  it("has the correct cell data", () => {
    const dataCells = top?.querySelectorAll("table > tbody > tr > td");
    expect(dataCells).to.exist;
    if (dataCells) {
      for (let k = 0; k < atomObjects.length; k++) {
        const a = atomObjects[k];
        expect(dataCells[2 * k].textContent).to.contain(a.name);
        expect(dataCells[2 * k + 1].textContent).to.contain(a.weight);
      }
    }
  });
  it("<tr> has a CSS class .heavy or .light", () => {
    const dataRows = top?.querySelectorAll("table > tbody > tr");
    expect(dataRows).to.exist;
    if (dataRows) {
      for (let k = 0; k < atomObjects.length; k++) {
        const a = atomObjects[k];
        expect(
          dataRows[k].classList.contains(a.weight > 150 ? "heavy" : "light")
        ).to.be.true;
      }
    }
  });
});
