// Test membuat agent untuk melewati chaptcha

const {
    Builder,
    By,
    Key,
    until,
} = require("selenium-webdriver");
// require("chromedriver");
const chrome = require("selenium-webdriver/chrome");


async function exampleTest() {

    // membuat agent yang menyerupai user asli untuk melewati chaptca google
    let options = new chrome.Options();

    options.addArguments(
        "user-agent=Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 640 XL LTE) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Mobile Safari/537.36 Edge/12.10166"
    );
    options.addArguments("--disable-blink-features=AutomationControlled"); //sembunyikan otomisasi


    //membuat koneksi dengan selenium webdriver yang ada di browser
    let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
    try {

        //buka halaman web
        await driver.get("http://www.google.com");

        //melakukan pencarian di google
        let searchBox = await driver.findElement(By.name("q")); // mencari element yang diinginkan

        //simulasi user behavior
        await searchBox.sendKeys("Hello World", Key.RETURN);
        await driver.wait(until.elementsLocated(By.id("result-states")), 10000) // menunggu sampai elemen yang diingikan ditemukan 

        let title = await driver.getTitle()
        console.log(`Page titile is : ${title}`)

        await driver.sleep(10000)

    } finally {
        await driver.quit();
    }


}

exampleTest();