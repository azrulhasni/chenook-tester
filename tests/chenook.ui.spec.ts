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
  yuser310 = "yuser310"
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

  await doApproval(page, workItemId, true);

  await logout(page);

  await login(page, User.yuser100, 'abc123');

  await doApproval(page, workItemId, true);

  await logout(page);

  await login(page, User.yuser112, 'abc123');

  await bookWorkAndSubmit(page, workItemId);

  await logout(page);

  await login(page, User.yuser211, 'abc123');

  await bookWorkAndSubmit(page, workItemId);

  await logout(page);

  await login(page, User.yuser210, 'abc123');

  await doApproval(page, workItemId, true);

  await logout(page);

  await login(page, User.yuser200, 'abc123');

  await doApproval(page, workItemId, true);

  await logout(page);

  await login(page, User.yuser213, 'abc123');

  await doApproval(page, workItemId, true);

  await logout(page);

  await login(page, User.yuser311, 'abc123');

  await bookWorkAndSubmit(page, workItemId);

  await logout(page);

  await login(page, User.yuser312, 'abc123');

  await doApproval(page, workItemId, true);

  await logout(page);

  await login(page, User.yuser313, 'abc123');

  await doApproval(page, workItemId, false);

  await logout(page);

  await login(page, User.yuser310, 'abc123');

  await doApproval(page, workItemId, false);

  await logout(page);

  //await approval(page,true)

  //approvalNeeded

  /*
  
  
    //Upload
    await upload(page, childFolder, 'tests/sample/old/Zed.pdf');
  
    // Click on <vaadin-button> "Clear selection"
    await page.click('#btnClearSelection');
  
    await doSearch(page, true, childFolder, 'zed');
  
    // Click on <vaadin-button> ">>"
    await page.click('#btnFinalStage-PAGE_NAV');
  
    // Click on <vaadin-button> "Open containing folder"
    await page.click('.card:nth-child(1) vaadin-button:nth-child(2)');
  
    //assert Zed.pdf is in the containing folder
    await expect(page.locator('//vaadin-grid-cell-content[17]')).toContainText('Zed.pdf');
  
    // Click on <vaadin-button> "View document"
    await page.click('.card:nth-child(1) vaadin-button:nth-child(1)');
  
    await logout(page);
  
    await login(page, User.user2, 'abc123');
  
    await upload(page, childFolder, 'tests/sample/msdocs/file-sample_1MB.doc');
  
    await doSearch(page, true, childFolder, 'vivomus');
  
    // Click on <vaadin-button> ">>"
    await page.click('#btnFinalStage-PAGE_NAV');
  
    // Click on <vaadin-button> "Open containing folder"
    await page.click('.card:nth-child(1) vaadin-button:nth-child(2)');
  
    //assert Zed.pdf is in the containing folder
    await expect(page.locator('//vaadin-grid-cell-content[17]')).toContainText('file-sample_1MB.doc.pdf');
  
    // Click on <vaadin-button> "View document"
    await page.click('.card:nth-child(1) vaadin-button:nth-child(1)');*/

  //await logout(page);
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
  if (await page.locator('vaadin-dev-tools div.notification-tray div.dismiss-message').count() > 0) {
    await page.click('vaadin-dev-tools div.notification-tray div.dismiss-message');
  }
}

async function openApplication(page) {
  await page.locator("//vaadin-drawer-toggle[@aria-label='Menu toggle']").click()
  await page.locator("vaadin-side-nav-item:nth-of-type(2)").click()
}

async function createApplicationAndApplicants(page, applicantCompanyName) {


  await page.locator("#new_S0\\.MY").click()
  const id = page.locator("//vaadin-text-field[@id='id']/input[1]").inputValue();
  await page.locator("//vaadin-text-field[@id='name']//input[1]").type(applicantCompanyName);
  await page.locator("//vaadin-text-area[@id='address']//textarea[1]").type("JTREND, MSC Central Incubatoor");
  await page.locator("//vaadin-text-field[@id='postalCode']//input[1]").type("63000");
  await selectComboBox(page, "state", "Selangor");
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
  await page.locator("input[type='file'][accept*='doc']").setInputFiles("tests/sample/old/Zed.pdf");

  await page.locator("//vaadin-button[@id='btnSaveAndSubmitApp']").click()
  return id;
}

async function doApproval(page, workItemId, approved){
  await openApplication(page);
  await page.locator("//vaadin-button[@id='btnMyWork"+workItemId+"']").click();
  await selectComboBox(page,"approvalNeeded", approved?"Approve":"Reject")
  await page.locator("//vaadin-button[@id='btnSaveAndSubmitApp']").click()
}

async function bookWorkAndSubmit(page, workItemId){
  await openApplication(page);
  await page.locator("//vaadin-button[@id='btnBook"+workItemId+"']").click();
  await page.locator("//vaadin-button[@id='btnSaveAndSubmitApp']").click()
}

async function selectComboBox(page, componentTestId, valueToBeSelected) {
  await page.locator("#" + componentTestId).click();
  await page.keyboard.type(valueToBeSelected);
  await page.keyboard.press('Enter');
}

/*
async function createFolderAndSubFolder(page, rootFolder, childFolder) {
  await createFolderAndSubFolder2(
    page,
    rootFolder,
    [UserFirstName.user3, UserFirstName.user4],
    [FolderRight.CREATE_AND_UPDATE, FolderRight.READ],
    childFolder,
    [UserFirstName.user2],
    [FolderRight.CREATE_AND_UPDATE]);
}
*/
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

/*
async function assignUsers(page, users: string[], rights: FolderRight[]) {
  //await page.click('vaadin-item:nth-child(2)');

  var i = 0;
  for (const user of users) {
    await page.type('input[placeholder="Search user"]', user);
    await page.click('(//vaadin-item[@role="option"])[1]');

    // Click on <vaadin-combo-box> #comboBoxRights
    await page.click('#comboBoxRights');

    // Click on <vaadin-combo-box-item> "Create and update"
    await page.fill('vaadin-horizontal-layout[theme="spacing"] vaadin-vertical-layout[theme="padding spacing"] input[role="combobox"]', '');
    await page.click('vaadin-horizontal-layout[theme="spacing"] vaadin-vertical-layout[theme="padding spacing"] input[role="combobox"]');
    await page.keyboard.type(rights[i].toString());
    await page.keyboard.press('Enter');
    //await page.click('#vaadin-combo-box-item-0');
    // Click on <vaadin-button> "Transfer >>"
    await page.click('#btnTransfer');
    await page.fill('input[placeholder="Search user"]', '');
    i++;
  };




}

async function upload(page, folder, file) {
  // Click on <vaadin-button> "Upload"
  await page.click('#btnUpload');

  // Click on <input> #input-vaadin-text-field-77
  await page.click('//vaadin-dialog-overlay[@aria-label="Upload"]//input[@role="combobox"]');

  //Choose an upload folder
  await page.fill('//vaadin-dialog-overlay[@aria-label="Upload"]//input[@role="combobox"]', '');
  await page.keyboard.type(folder + '()');
  await page.keyboard.press('Enter');


  // Fill "#zed #programming"   
  await page.locator('kelichap-autocomplete[colspan="2"]').click()
  await page.locator('kelichap-autocomplete[colspan="2"]').type("#zed #programming");

  //await page.fill('//vaadin-dialog-overlay[@aria-label="Upload"]//input[@type="text"]', 'aaa bbb');



  //upload
  await page.locator('#fileInput').setInputFiles(file);

  await page.waitForTimeout(3000);

  // Click on <vaadin-button> "Save"
  await page.click('div > vaadin-button:nth-child(1)');

}
*/

