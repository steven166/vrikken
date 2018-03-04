import { VrikkenUiPage } from './app.po';

describe('vrikken-ui App', function() {
  let page: VrikkenUiPage;

  beforeEach(() => {
    page = new VrikkenUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
