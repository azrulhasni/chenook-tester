//To run test: npx playwright test

import { test, expect } from '@playwright/test';


export enum User {
  yuser111 = "yuser111",
  yuser110 = "yuser110",
  yuser100 = "yuser100",
  yuser112 = "yuser112",
  yuser211 = "yuser211",
  yuser210 = "yuser210",
  yuser200 = "yuser200",
  yuser212 = "yuser212",
  yuser213 = "yuser213",
  yuser311 = "yuser311",
  yuser312 = "yuser312",
  yuser313 = "yuser313",
  yuser310 = "yuser310",
  yadmin = "yadmin",
  ychecker = "ychecker"
}




test('happy-path', async ({ page }) => {
  test.setTimeout(200000);

  // Load "http://localhost:18080/"
  await page.goto('http://localhost:18080/');

  await login(page, User.yuser111, 'abc123');

  const applicantCompanyName = "MyBiz";

  await openApplication(page);

  const workItemId = await createApplicationAndApplicants(page, applicantCompanyName);

  await logout(page);

  await login(page, User.yuser110, 'abc123');

  await doApproval(page, workItemId, true, "OK");

  await logout(page);

  await login(page, User.yuser100, 'abc123');

  await doApproval(page, workItemId, true, "OK");

  await logout(page);

  await login(page, User.yuser112, 'abc123');

  await book(page, workItemId);

  await fillInSiteVisitReport(page);

  await submit(page);

  await logout(page);

  await login(page, User.yuser211, 'abc123');

  await bookWorkAndSubmit(page, workItemId);

  await logout(page);

  await login(page, User.yuser210, 'abc123');

  await doApproval(page, workItemId, true,  "OK");

  await logout(page);

  await login(page, User.yuser200, 'abc123');

  await doApproval(page, workItemId, true, "OK");

  await logout(page);

  await login(page, User.yuser212, 'abc123');

  await doApproval(page, workItemId, true, "OK");

  await logout(page);


  await login(page, User.yuser311, 'abc123');

  await bookWorkAndSubmit(page, workItemId);

  await logout(page);

  await login(page, User.yuser312, 'abc123');

  await doApproval(page, workItemId, true, "OK");

  await logout(page);

  await login(page, User.yuser313, 'abc123');

  await doApproval(page, workItemId, false, "Tie breaker");

  await logout(page);

  await login(page, User.yuser310, 'abc123');

  await doApproval(page, workItemId, true, "OK");

  await logout(page);

  await login(page, User.yuser111, 'abc123');

  await book(page, workItemId);

  await informCustomer(page, workItemId);

  await logout(page);

});

test('exception-path-until-underwriting', async ({ page }) => {
  test.setTimeout(600000);

  // Load "http://localhost:18080/"
  await page.goto('http://localhost:18080/');

  await login(page, User.yuser111, 'abc123');

  const applicantCompanyName = "MyBiz";

  await openApplication(page);

  const workItemId = await createApplicationAndApplicants(page, applicantCompanyName);

  await logout(page);

  await login(page, User.yuser110, 'abc123');

  await doApproval(page, workItemId, false, "Rejected because addrress is not correct");

  await logout(page);

  await login(page, User.yuser111, 'abc123');

  await correctAddress(page,workItemId);

  await logout(page);

  await login(page, User.yuser110, 'abc123');

  await doApproval(page, workItemId, true, "OK");

  await logout(page);

  await login(page, User.yuser100, 'abc123');

  await doApproval(page, workItemId, false, "Rejected because addrress is not correct");

  await logout(page);

  await login(page, User.yuser111, 'abc123');

  await correctAddress2(page,workItemId);

  await logout(page);

  await login(page, User.yuser110, 'abc123');

  await doApproval(page, workItemId, true, "OK");

  await logout(page);

  await login(page, User.yuser100, 'abc123');

  await doApproval(page, workItemId, true, "OK");

  await logout(page);

  await login(page, User.yuser112, 'abc123');

  await book(page, workItemId);

  await fillInSiteVisitReport(page);

  await submit(page);

  await logout(page);

  await login(page, User.yuser211, 'abc123');

  await bookWorkAndSubmit(page, workItemId);

  await logout(page);

  await login(page, User.yuser210, 'abc123');

  await doApproval(page, workItemId, true, "OK");

  await logout(page);

  await login(page, User.yuser200, 'abc123');

  await doApproval(page, workItemId, true, "OK");

  await logout(page);

  await login(page, User.yuser213, 'abc123');

  await doApproval(page, workItemId, false, "Bad credit score");

  await logout(page);

  await login(page, User.yuser212, 'abc123');

  await doApproval(page, workItemId, false, "Bad credit score");

  await logout(page);

  await login(page, User.yuser111, 'abc123');

  await book(page, workItemId);

  await informCustomer(page, workItemId);

  await logout(page);

});

test('admin-create-happy-path', async ({ page }) => {
  test.setTimeout(600000);

  // Load "http://localhost:18080/"
  await page.goto('http://localhost:18080/');

  await login(page, User.yadmin, 'abc123');

  await openLocation(page);

  const workItemId = await createLocations(page,'AAA', 'BBB', 'Malaysia', 'CCC', 'DDD', 'Malaysia');

  await logout(page);

  await login(page, User.ychecker, 'abc123');

  await doApprovalForLocation(page, workItemId, true, "OK");

  await logout(page);

  
});



async function doSearch(page, equalsChildFolder, childFolder, keyword) {
  // Click on <input> #input-vaadin-text-field-12
  await page.click('//input[@type="text"]');

  // Fill "zed" on <input> #input-vaadin-text-field-12
  await page.fill('//input[@type="text"]', keyword);

  // Click on <vaadin-button> "Search"
  await page.click('#btnSearch');
  if (equalsChildFolder) {
    await expect(page.locator('vaadin-horizontal-layout:nth-child(1) vaadin-vertical-layout:nth-child(1) vaadin-horizontal-layout:nth-child(1) span:nth-child(2)')).toContainText(childFolder);
  } else {
    await expect(page.locator('vaadin-horizontal-layout:nth-child(1) vaadin-vertical-layout:nth-child(1) vaadin-horizontal-layout:nth-child(1) span:nth-child(2)')).not.toContainText(childFolder);
  }

}

async function logout(page) {
  //await page.locator("//vaadin-drawer-toggle[@aria-label='Menu toggle']").click()

  await page.click('//vaadin-menu-bar-item[@aria-selected="false"]//div');

  await page.click('vaadin-menu-bar-item[role="menuitem"]');

  await page.click('button[type="submit"]');

  await page.click('a[href="/oauth2/authorization/keycloak"]');
}

async function login(page, username, password) {
  // Resize window to 1280 x 687
  await page.setViewportSize({ width: 1280, height: 687 });

  // Fill "user1" on <input> #username
  await page.fill('#username', username);

  // Press Tab on input
  await page.press('#username', 'Tab');

  // Fill "abc123" on <input> #password
  await page.fill('#password', password);

  // Click on <input> #kc-login
  await Promise.all([
    page.click('#kc-login'),
    page.waitForNavigation()
  ]);
  //if (await page.locator('vaadin-dev-tools div.notification-tray div.dismiss-message').count() > 0) {
  //  await page.click('vaadin-dev-tools div.notification-tray div.dismiss-message');
  //}
  if (await page.locator('.dismiss-message').count() > 0) {
    await page.click('.dismiss-message');
  }
}

async function openApplication(page) {
  await page.locator("//vaadin-drawer-toggle[@aria-label='Menu toggle']").click()
  await page.locator("//vaadin-side-nav-item[@id='sme-financing-link']").click()
}

async function openLocation(page) {
  await page.locator("//vaadin-drawer-toggle[@aria-label='Menu toggle']").click()
  await page. getByRole('button', { name: 'Admin Toggle child items' }).click();
  await page.locator("//vaadin-side-nav-item[@id='ref-location-link']").click()
}

async function fillInSiteVisitReport(page){
  await page.locator("//vaadin-text-area[@id='siteVisitReport']//textarea[1]").type("Site was adequate and in good condition.");
}

async function informCustomer(page, workItemId){
  await page.locator("//vaadin-button[@id='btnSaveAndSubmitApp']").click()
}

async function correctAddress(page, workItemId){
  await openApplication(page);

  await page.locator("//vaadin-text-field[@id='searchField-mywork']//input[1]").type(workItemId);
  await page.locator("//vaadin-button[@id='searchBtn-mywork']").click();
  await page.locator("//vaadin-button[@id='btnMyWork"+workItemId+"']").click();

  await page.locator("//vaadin-button[@id='btnWorkflowInfo']").click();
  await page.locator("(//span[@id='spanApproval'])[1]").click();
  await page.locator("//vaadin-button[@id='btnClose']").click();
  await page.locator("//vaadin-button[@id='btnDone']").click();

  
  await page.locator("//vaadin-text-field[@id='postalCode']//input[1]").focus();
  await page.keyboard.press("Meta+A");
  await page.keyboard.press("Backspace");
  await page.locator("//vaadin-text-field[@id='postalCode']//input[1]").type("63100");
  await page.locator("//vaadin-text-area[@id='address']//textarea[1]").focus();
  await page.keyboard.press("Meta+A");
  await page.keyboard.press("Backspace");
  await page.locator("//vaadin-text-area[@id='address']//textarea[1]").type("JTRND, MSC Central Incubator");
  await page.locator("//vaadin-button[@id='btnSaveAndSubmitApp']").click();
}

async function correctAddress2(page, workItemId){
  await openApplication(page);


  await page.locator("//vaadin-text-field[@id='searchField-mywork']//input[1]").type(workItemId);
  await page.locator("//vaadin-button[@id='searchBtn-mywork']").click();
  await page.locator("//vaadin-button[@id='btnMyWork"+workItemId+"']").click();

  await page.locator("//vaadin-button[@id='btnWorkflowInfo']").click();
  await page.locator("(//span[@id='spanApproval'])[1]").click();
  await page.locator("//vaadin-button[@id='btnClose']").click();
  await page.locator("//vaadin-button[@id='btnDone']").click();
  
  await page.locator("//vaadin-text-field[@id='postalCode']//input[1]").focus();
  await page.keyboard.press("Meta+A");
  await page.keyboard.press("Backspace");
  await page.locator("//vaadin-text-field[@id='postalCode']//input[1]").type("63200");
  await page.locator("//vaadin-text-area[@id='address']//textarea[1]").focus();
  await page.keyboard.press("Meta+A");
  await page.keyboard.press("Backspace");
  await page.locator("//vaadin-text-area[@id='address']//textarea[1]").type("JTRND, MSC Central Incubator 2");
  await page.locator("//vaadin-button[@id='btnSaveAndSubmitApp']").click()
}


async function createApplicationAndApplicants(page, applicantCompanyName) {

  await page.locator("#new_S0\\.MY").click()
  const id = page.locator("//vaadin-text-field[@id='id']/input[1]").inputValue();
  await page.locator("//vaadin-text-field[@id='name']//input[1]").type(applicantCompanyName);
  await page.locator("//vaadin-text-area[@id='address']//textarea[1]").type("JTREND, MSC Central Incubatoor");
  await page.locator("//vaadin-text-field[@id='postalCode']//input[1]").type("63000");
  //await selectComboBox(page, "state", "Selangor");
  await selectReference(page,"location","gomb*");

  await page.locator("//vaadin-text-field[@id='ssmRegistrationNumber']//input[1]").type("MY12345678");
  await page.locator("//vaadin-text-field[@id='financingRequested.amount']//input[1]").type("20,000");
  await page.locator("//vaadin-text-area[@id='reasonForFinancing']//textarea[1]").type("Equipment purchase");

  await page.locator("//vaadin-button[@id='btnAddApplicant']").click()
  await page.locator("//vaadin-text-field[@id='fullName']//input[1]").type("Donald Duck");
  await page.locator("//vaadin-text-field[@id='icNumber']//input[1]").type("780101010101");
  await page.locator("//vaadin-text-field[@id='phoneNumber']//input[1]").type("0123456789");
  await page.locator("//vaadin-text-field[@id='email']//input[1]").type("donald.duck@mybiz.com");
  await selectComboBox(page, "type", "DIRECTOR");
  await page.locator("input[type='file'][accept='.png']").setInputFiles("tests/sample/sign/signDonald.png");
  await page.locator("#type").click()
  await page.locator("//vaadin-button[@id='btnSave']").click()

  await page.locator("//vaadin-button[@id='btnAddApplicant']").click()
  await page.locator("//vaadin-text-field[@id='fullName']//input[1]").type("DaisyDuck");
  await page.locator("//vaadin-text-field[@id='icNumber']//input[1]").type("780202020202");
  await page.locator("//vaadin-text-field[@id='phoneNumber']//input[1]").type("01298765432");
  await page.locator("//vaadin-text-field[@id='email']//input[1]").type("daisy.duck@mybiz.com");
  await selectComboBox(page, "type", "SHAREHOLDER");
  await page.locator("input[type='file'][accept='.png']").setInputFiles("tests/sample/sign/signDaisy.png");
  await page.locator("#type").click()
  await page.locator("//vaadin-button[@id='btnSave']").click();
  //await page.locator("input[type='file'][accept*='doc']").setInputFiles("tests/sample/old/Zed.pdf");

  await page.locator("//vaadin-button[@id='btnSaveAndSubmitApp']").click()
  return id;
}

async function createLocations(page, district1, state1, country1, district2, state2, country2) {
//vaadin-menu-bar-item[@id='new_S0.REF.CREATE.MAKER']
  await page.locator("//vaadin-menu-bar-item[@id='new_S0.REF.CREATE.MAKER']").click()
  const id = page.locator("//vaadin-text-field[@id='id']//input[1]").inputValue();

  await page.locator("//vaadin-button[@id='btnAdd']").click();

  await page.locator("//vaadin-text-field[@id='district']//input[1]").type(district1);
  await page.locator("//vaadin-text-field[@id='state']//input[1]").type(state1);
  await page.locator("//vaadin-text-field[@id='country']//input[1]").type(country1);
  
  await page.locator("//vaadin-button[@id='btnSave']").click();

  await page.locator("//vaadin-button[@id='btnAdd']").click();

  await page.locator("//vaadin-text-field[@id='district']//input[1]").type(district2);
  await page.locator("//vaadin-text-field[@id='state']//input[1]").type(state2);
  await page.locator("//vaadin-text-field[@id='country']//input[1]").type(country2);
  await page.locator("//vaadin-button[@id='btnSave']").click();

  await page.locator("//vaadin-button[@id='btnSaveAndSubmit']").click();
  
  return id;
}

async function doApproval(page, workItemId, approved, message){
  await openApplication(page);
  await page.locator("//vaadin-button[@id='btnMyWork"+workItemId+"']").click();
  await page.locator("//vaadin-button[@id='btnApproval']").click();
  await selectComboBox(page,"approvalNeeded", approved?"Approve":"Reject")
  if (approved==false){
    await page.locator("//vaadin-text-area[@id='approvalNote']//textarea[1]").type(message)
  }else{
    await page.locator("//vaadin-text-area[@id='approvalNote']//textarea[1]").type(message)
  }
  await page.locator("//vaadin-button[@id='btnClose']").click()
  await page.locator("//vaadin-button[@id='btnSaveAndSubmitApp']").click()
  
}

async function doApprovalForLocation(page, workItemId, approved, message){
  await openLocation(page);
  await page.locator("//vaadin-button[@id='btnMyWork"+workItemId+"']").click();
  await page.locator("//vaadin-button[@id='btnApproval']").click();
  await selectComboBox(page,"approvalNeeded", approved?"Approve":"Reject")
  if (approved==false){
    await page.locator("//vaadin-text-area[@id='approvalNote']//textarea[1]").type(message)
  }else{
    await page.locator("//vaadin-text-area[@id='approvalNote']//textarea[1]").type(message)
  }
  await page.locator("//vaadin-button[@id='btnClose']").click()
  await page.locator("//vaadin-button[@id='btnSaveAndSubmit']").click()
  
}

async function bookWorkAndSubmit(page, workItemId){
  await openApplication(page);
  await page.locator("//vaadin-tab[@id='tabWorkList']").click();
  await page.locator("//vaadin-button[@id='btnBook"+workItemId+"']").click();
  await page.locator("//vaadin-button[@id='btnSaveAndSubmitApp']").click()
}

async function book(page, workItemId){
  await openApplication(page);
  await page.locator("//vaadin-tab[@id='tabWorkList']").click();
  await page.locator("//vaadin-button[@id='btnBook"+workItemId+"']").click();
  
}

async function submit(page){
  await page.locator("//vaadin-button[@id='btnSaveAndSubmitApp']").click()
}

async function selectComboBox(page, componentTestId, valueToBeSelected) {
  await page.locator("#" + componentTestId).click();
  await page.keyboard.type(valueToBeSelected);
  await page.keyboard.press('Enter');
}

async function selectReference(page, fieldName, valueToBeSelected){
  await page.locator("//vaadin-button[@id='btnSelectDialog-"+fieldName+"']").click();
  await page.locator("//vaadin-text-field[@id='searchField-"+fieldName+"']/input").type(valueToBeSelected);
  await page.locator("//vaadin-button[@id='searchBtn-"+fieldName+"']").click();
  await page.waitForTimeout(1000); //wait for a second
  await page.locator("(//input[@value='on'])[2]").click();
  await page.locator("//vaadin-button[@id='btnSelect-"+fieldName+"']").click();
}

async function createFolderAndSubFolder2(page, rootFolder, rootFolderUsers, rootFolderRights, childFolder, childFolderUsers, childFolderRights) {
  // Click on <vaadin-button> "Create folder"
  await page.click('#btnCreateFolder');

  // Click on Create folder
  await page.click('vaadin-dialog-overlay[aria-label="Create folder"] input[type="text"]');

  // Fill "folder 240308 1" on <input> #input-vaadin-text-field-22
  await page.fill('vaadin-dialog-overlay[aria-label="Create folder"] input[type="text"]', rootFolder);


  // Click on <vaadin-button> "Create"
  await page.click('div > vaadin-button:nth-child(1)');

  //Click on newly created folder
  await page.click('vaadin-grid-cell-content[slot="vaadin-grid-cell-content-10"]');

  // Click on <vaadin-button> "Create folder"
  await page.click('#btnCreateFolder');

  // Click on <input> #input-vaadin-text-field-34
  await page.click('//vaadin-dialog-overlay[@aria-label="Create folder"]//input[@type="text"]');

  // Fill "folder 240308 1 1" on Create folfder
  await page.fill('//vaadin-dialog-overlay[@aria-label="Create folder"]//input[@type="text"]', childFolder);



  // Click on <vaadin-button> "Create"
  await page.click('div > vaadin-button:nth-child(1)');

  //click on newly created folder 
  await page.click('vaadin-grid-cell-content[slot="vaadin-grid-cell-content-13"]');

  //Folder name of first row
  await expect(page.locator('vaadin-grid-cell-content[slot="vaadin-grid-cell-content-10"]')).toContainText(rootFolder);

  //Clear selection after folder create
  await page.click('#btnClearSelection');
}
