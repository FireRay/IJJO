let { $, sleep } = require('./funcs');

module.exports = function () {
  let mainWin;
  this.When(/^I browse the statpage$/, async function () {
    await helpers.loadPage('https://www.imdb.com/');

  });

  this.Then(/^the footer should contain the information$/, async function (table) {
    const data = table.raw();
    let linkText = await $('.ipc-inline-list__item');
    let i = 0;
    for (let result of linkText) {
      let text = await result.getText();
      if (text) {
        i++;
        expect(text,
          'The link text did not match the table text '
        ).to.equal(data[i][0]);
      }
    }
  });

  this.Then(/^images and extrenal links to$/, async function (table) {
    const data = table.raw();
    let linkText = await $('._27Hr-itnXHPpOoaB59daSz ul._1W6LtHiV5M-NUnes6xN1az li');
    let i = 0;
    for (let result of linkText) {
      let linkText = await $('.ipc-inline-list__item [aria-label="' + data[i + 1][0] + '"]');
      let text = await linkText.getAttribute("title");
      i++;
      expect(text,
        'The link icon did not match the title text '
      ).to.equal(data[i][0]);
    }
  });

  this.Then(/^the text "([^"]*)"$/, async function (copyRightText) {
    let copyRight = await $('p.imdb-footer__copyright._1qNTRY72M5RnFTeiT5Ho-6');
    copyRight = await copyRight.getAttribute("innerText");

    expect(copyRight,
      'The copyright text could not be found'
    ).to.equal(copyRightText);
  });

  this.Then(/^that IMDb loggo is pressent$/, async function () {
    let logo = await $('.imdb-footer__logo');
    expect(logo,
      'The footer logo could not be found'
    ).to.exist;
  });

}