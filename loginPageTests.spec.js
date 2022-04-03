const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { Constants } = require('../helpers/helper');

test.describe('Login and password', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(Constants.SITE);
    });

    test('should pass for correct data', async ({ page }) => {    
        const loginPage = new LoginPage(page);
        await loginPage.EnterLogoPass(Constants.VALIDLOGIN, Constants.VALIDPASSWORD);
    
        await page.click("button[type='submit']")
    
        await expect(page.locator('h4:has-text("Проекты")')).toBeVisible();
        await expect(page.locator('#page-header-user-dropdown')).toBeVisible();
        await expect(page.locator('div.simplebar-wrapper')).toBeVisible(); 
    });

    let invalidUsers = [
        {login: Constants.VALIDLOGIN, password: 'test'}, 
        {login: 'io@inbox.ru', password: Constants.VALIDPASSWORD},
        {login: 'io@inbox.ru', password: 'test'}
    ];

    for (let user of invalidUsers) {
        test(`should fail for ${user.login} and ${user.password}`, async ({ page }, testInfo) => {
            const loginPage = new LoginPage(page);
            await loginPage.EnterLogoPass(user.login, user.password);
        
            await page.click("button[type='submit']") 

            await expect(page.locator('div[role="alert"]:has-text("Неверные учетные данные")')).toBeVisible();
            //wait for animations and take a screenshot            
            await page.waitForTimeout(100);
            await page.screenshot({animations: "disabled", path: testInfo.outputPath(`enter_${user.login}_${user.password}.png`), fullPage: true});
        });
    }    
});
