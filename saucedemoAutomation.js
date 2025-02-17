const  {Builder, By, Key, until,} = require("selenium-webdriver");
const assert = require('assert');

async function saucedemoLogin() {

    let driver = await new Builder().forBrowser("chrome").build();
    try{
    await driver.get("https://www.saucedemo.com/");

    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');

    await driver.findElement(By.id('login-button')).click();


    let titleText = await driver.findElement(By.css('.app_logo')).getText();
    assert.strictEqual(titleText.includes('Swag Lab'),true,"Title Does not include Swag Labs");


    await driver.sleep(10000)
    }
finally {
    await driver.quit();
}
 
}

saucedemoLogin();
