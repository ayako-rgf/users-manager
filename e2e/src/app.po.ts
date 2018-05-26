import { browser, by, element } from 'protractor';

export class AppPage {
    navigateTo() {
        return browser.get('/');
    }
    getDocumentTitle() {
        return browser.getTitle();
    }
    getParagraphText() {
        return element(by.css('app-root h1')).getText();
    }
    getNavigationBarText() {
        return element(by.css('.mat-tab-link')).getText();
    }
}
