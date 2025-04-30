const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

async function saucedemoLogin() {
  let driver = await new Builder().forBrowser("firefox").build();
  await driver.manage().window().maximize();
  try {
    //mengakses website Saucedemo
    await driver.get("https://www.saucedemo.com/");
    await driver.sleep(2000);

    //menginputkan username dan password
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");

    //klik tombol login
    await driver.findElement(By.id("login-button")).click();

    // validasi apakah sudah berhasil menampilkan halaman dashboard
    let titleText = await driver.findElement(By.css(".app_logo")).getText();
    assert.strictEqual(
      titleText.includes("Swag Lab"),
      true,
      "Title Does not include Swag Labs"
    );
    await driver.sleep(5000);

    // menambahkan produk ke keranjang
    await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click();

    // melakukan validasi apakah produk berhasil ditambahkan ke keranjang
    let cart = await driver.findElement(By.css(".shopping_cart_link"));
    assert.strictEqual(
      await cart.isDisplayed(),
      true,
      "You haven't selected a product yet"
    );
    let title = await driver.getTitle();
    console.log(`Test case add to cart berhasil | ${title}`);

    await driver.sleep(10000);

  } finally {
    await driver.quit();
  }
}

saucedemoLogin();
