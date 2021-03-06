let { $, sleep } = require('./funcs');
const { username, password } = require('./credentials.json');

module.exports = function () {

  let text;
  let listOrginal, topFiveList, resultArr = []

  this.Given(/^that I am on the Most Popular Celebs Page$/, async function () {
    await helpers.loadPage('https://www.imdb.com/search/name/?gender=male%2Cfemale&ref_=nv_cel_m');
    await sleep(2000);
  });

  this.When(/^I click on one of the top five Celeb links$/, async function () {
    // see test below
    //step 1: Find the <a ref> elements and put them in an array.
    listOrginal = await $('.lister-item-header > a');
    //step 2: slice the array so only the first 5 elements are there and loop them to get text 
    topFiveList = listOrginal.slice(0, 5);
    for (let prop of topFiveList) {
      resultArr.push(await prop.getText());
    }
  });

  this.Then(/^I should be taken to the ranked most popular homepage$/, async function () {
    //step 3: click on every element(link) aka most popular actor/actress
    await topFiveList[0].click();
    //step 4: get the headline text from every most popular actor/actress OWN page
    text = await driver.findElement(By.css('.header > .itemprop')).getText();
    await sleep(0);
    //step 5: test that resultArr includes the text from the 
    assert.include(resultArr, text,
      'clickable link and page title are not the same'
    );
  });

  this.Then(/^I should be taken to the ranked second popular homepage$/, async function () {
    await topFiveList[1].click();
    text = await driver.findElement(By.css('.header > .itemprop')).getText();
    await sleep(0);
    assert.include(resultArr, text,
      'clickable link and page title are not the same'
    );
  });

  this.Then(/^I should be taken to the ranked third popular homepage$/, async function () {
    await topFiveList[2].click();
    text = await driver.findElement(By.css('.header > .itemprop')).getText();
    await sleep(0);
    assert.include(resultArr, text,
      'clickable link and page title are not the same'
    );
  });

  this.Then(/^I should be taken to the ranked forth popular homepage$/, async function () {
    await topFiveList[3].click();
    text = await driver.findElement(By.css('.header > .itemprop')).getText();
    await sleep(2000);
    assert.include(resultArr, text,
      'clickable link and page title are not the same'
    );
  });

  this.Then(/^I should be taken to the ranked fifth popular homepage$/, async function () {
    await topFiveList[4].click();
    text = await driver.findElement(By.css('.header > .itemprop')).getText();
    await sleep(2000);
    assert.include(resultArr, text,
      'clickable link and page title are not the same'
    );
  });

}