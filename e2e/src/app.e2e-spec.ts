import { AppPage } from './app.po';

describe('workspace-project App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });
    it('document title', () => {
        page.navigateTo();
        expect(page.getDocumentTitle()).toEqual('Manage Users');
    });
});
