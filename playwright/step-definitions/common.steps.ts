import { Given } from '@cucumber/cucumber';
import { ICustomWorld } from '../support/world';

// Step reutilizado por todos os features que precisam de usuário logado
Given('I am logged in as {string}', async function (this: ICustomWorld, username: string) {
    await this.loginPage.goto();
    await this.loginPage.login(username, 'secret_sauce');
    await this.page.waitForURL('**/inventory.html', { timeout: 10000 });
});

Given('I am logged in as a standard user', async function (this: ICustomWorld) {
    await this.loginPage.goto();
    await this.loginPage.login('standard_user', 'secret_sauce');
    await this.page.waitForURL('**/inventory.html', { timeout: 10000 });
});