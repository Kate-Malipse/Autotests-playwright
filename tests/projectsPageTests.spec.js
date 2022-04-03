const { test, expect } = require('@playwright/test');
const { Helper, Constants } = require('../helpers/helper');
const { ProjectsPage } = require('../pages/projectsPage');
const { LoginPage } = require('../pages/loginPage');

test.describe('Create project', ()=> {
    test.beforeEach(async ({ page }) => {
        let loginPage = new LoginPage(page);
        await page.goto(Constants.SITE);        
        await loginPage.EnterLogoPass(Constants.VALIDLOGIN, Constants.VALIDPASSWORD);
        await page.click('button[type="submit"]');
        await page.click('button:has-text("Добавить")');
        //wait until there are no network connections
        await page.waitForLoadState('networkidle'); 
    });

    test('with correct data', async({ page }) => {
        let projectPage = new ProjectsPage(page);
        let projectCode = Helper.GenerateProjectCode(); 
        let timestamp = new Date().toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit' });
        let projectName = `Test Selenium (${timestamp})`;
               
        await projectPage.EnterMainInfo(projectName, projectCode);

        await expect(page.locator('tbody[data-test="table-body"] > tr > td > span:text-is("Vlad")')).toBeVisible();
        await expect(page.locator('tbody[data-test="table-body"] > tr > td > span:text-is("Test")')).toBeVisible();

        await page.click('form[method="get"] > div > button:has-text("Сохранить")');
        
        await expect(page.locator(`h5:has-text("${projectName}")`)).toBeVisible();
    });

    let invalidProjectCodes = ['12345', 'dfret', '$&#~!', 'DFRT1'];

    for (let projectCode of invalidProjectCodes) {
        test(`with ${projectCode} project code`, async({ page }, testInfo) => {     
            await page.fill('input#code', projectCode);       
            //new project should not be saved
            await page.click('form[method="get"] > div > button:has-text("Сохранить")');
            await expect(page.locator(`h4:has-text("Добавление проекта")`)).toBeVisible(); 
            //expect warning message
            await expect(page.locator(`div.invalid-feedback:has-text("Код должен состоять только из больших латинских букв")`)).toBeVisible();
            await page.screenshot({animations: "disabled", path: testInfo.outputPath(`create_project_with_${projectCode}_code.png`), fullPage: true});
        });
    }
    
    let emptyProjectCodes = ['', '     '];

    for (let i = 0; emptyProjectCodes.length > i; i++) {
        test(`with '${emptyProjectCodes[i]}' project code`, async({ page }, testInfo) => {            
            await page.fill('input#code', emptyProjectCodes[i]);            
            await page.click('form[method="get"] > div > button:has-text("Сохранить")'); 
            //new project should not be saved
            await expect(page.locator(`h4:has-text("Добавление проекта")`)).toBeVisible();
            //expect warning message
            await expect(page.locator(`div.invalid-feedback:has-text("Пожалуйста введите код")`)).toBeVisible();
            await page.screenshot({animations: "disabled", path: testInfo.outputPath(`create_project_with_empty_code${i}.png`), fullPage: true});
        });
    }

    test('with empty project name', async ({ page }, testInfo) => {          
        let projectCode = Helper.GenerateProjectCode();

        await page.fill('input#code', projectCode);
        await page.fill('input#title', '');   
        //new project should not be saved
        await page.click('form[method="get"] > div > button:has-text("Сохранить")');
        await expect(page.locator(`h4:has-text("Добавление проекта")`)).toBeVisible(); 
        //expect warning message
        await expect(page.locator(`div.invalid-feedback:has-text("Пожалуйста введите название проекта")`)).toBeVisible();
        await page.screenshot({animations: "disabled", path: testInfo.outputPath(`create_project_with_empty_project_name.png`), fullPage: true});
    });
});

test.describe('Create guest', () => {
    test.beforeEach(async ({ page }) => {
        let loginPage = new LoginPage(page);
        await page.goto(Constants.SITE);        
        await loginPage.EnterLogoPass(Constants.VALIDLOGIN, Constants.VALIDPASSWORD);
        await page.click('button[type="submit"]');
        await page.click('button:has-text("Добавить")');
        //wait until there are no network connections
        await page.waitForLoadState('networkidle');
    });

    test('with valid data to project', async ({ page }) => {
        let projectPage = new ProjectsPage(page);
        let emailRandomPart = Helper.GenerateProjectCode();
        let guestEmail = `${emailRandomPart}@viewgin.com`;  
        let matchingNames = await projectPage.GetMatchingEmployeeNames("Test Selenium");
        let nextNumber = Number(matchingNames.pop().split(' ').pop());
        let guestName = `Test Selenium ${++nextNumber}`;

        await projectPage.AddGuest(guestName, guestEmail, "test1234!");

        await expect(page.locator(`td:nth-child(2) > b:text-is("${guestName}")`)).toBeVisible();
        await expect(page.locator(`div.table-responsive > div > table > tbody > tr:nth-child(1) > td:nth-child(3)`)).toContainText('Гость');
        await expect(page.locator(`tbody[data-test="table-body"] > tr > td > span:text-is("${guestName}")`)).toBeVisible();       
    })
});
