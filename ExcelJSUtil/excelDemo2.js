//Update Banana price to 300
const ExcelJs = require('exceljs');
async function writeExcelTest(searchText, replaceText, change, filePath){
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet,searchText);
    const cell = worksheet.getCell(output.row,output.col+change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}
async function readExcel(worksheet,searchText){
    let output={row:-1,col:-1};
    worksheet.eachRow((row,rowNumber)=>{
        row.eachCell((cell,colNumber)=>{
            if(cell.value===searchText){
                output.row=rowNumber;
                output.col=colNumber;
            }
        })
    })
    return output;
}
writeExcelTest("Banana",300,{rowChange:0,colChange:2}, "C:\\Users\\91901\\Downloads\\download.xlsx");