const playwright = require('playwright');

class ProjectsPage {
    constructor(page) {
        this.page = page;
    }      

    async EnterMainInfo(projectName, code) {
        await this.page.fill('input#code', code);
        await this.page.fill('input#title', projectName);

        await this.page.click('input[name="endDate"]');
        await this.page.selectOption('select[aria-label="Month"]', {value: '10'});
        await this.page.click('div.dayContainer > span[aria-label="November 30, 2021"]');

        await this.page.click('tbody[data-test="table-body"] > tr > td:text-is("Vlad")');
        await this.page.click('tbody[data-test="table-body"] > tr > td:text-is("Test")');
    }

    async AddGuest(guestName, guestEmail, guestPassword) {
        await this.page.fill('input#name', guestName);
        await this.page.fill('input#email', guestEmail);
        await this.page.fill('input#password', guestPassword);
        await this.page.click('button:has-text("Добавить")');
    }

    async GetMatchingEmployeeNames(guestName) {
        let namesLocator = this.page.locator(`div[data-test="table"] > table > tbody > tr > td:has-text("${guestName}")`);
        let matchingNames = await namesLocator.evaluateAll(items => items
            .map(n => n.innerText)
            .sort());

        return matchingNames;
    }
}

module.exports = { ProjectsPage }
