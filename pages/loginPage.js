class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async EnterLogoPass(login, password) {
        await this.page.fill("input#email", login);
        await this.page.fill("input#password", password);
    }
}

module.exports = { LoginPage }