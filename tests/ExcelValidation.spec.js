//Update the kivi price to 400
const { test, expect } = require('@playwright/test');
const ExcelJS = require('exceljs');

async function writeExcelTest(searchText, replaceText, change, filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Sheet1');
  const output = await readExcel(worksheet, searchText);

  const cell = worksheet.getCell(output.row + change.rowChange, output.col + change.colChange);
  cell.value = replaceText;

  await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {
  let output = { row: -1, col: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.col = colNumber;
      }
    });
  });
  return output;
}

test('Upload download excel validation', async ({ page }) => {
  const textSearch = 'Kivi';
  const updateValue = '400';

  await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

  // Capture the download
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: "Download" }).click();
  const download = await downloadPromise;

  // Save to a known path
  const targetPath = "C:\\Users\\91901\\Downloads\\download.xlsx";
  await download.saveAs(targetPath);

  // Update the Excel file
  await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, targetPath);

  // Upload the updated file
  await page.locator("#fileinput").setInputFiles(targetPath);

  // Validate the updated value in the table
  const textlocator = page.getByText(textSearch);
  const desiredRow = page.getByRole('row').filter({ has: textlocator });
  await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
});
