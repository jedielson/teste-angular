import { WebMetasWeb1Page } from './app.po';

describe('web-metas-web1 App', () => {
  let page: WebMetasWeb1Page;

  beforeEach(() => {
    page = new WebMetasWeb1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
