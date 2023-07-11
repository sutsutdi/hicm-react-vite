import * as mysql from 'mysql2/promise';
import * as ExcelJS from 'exceljs';

async function uploadExcelToMySQL() {
  try {
    // Set up the database connection
    const connection = await mysql.createConnection({
      host: 'your_host',
      user: 'your_user',
      password: 'your_password',
      database: 'your_database',
    });

    // Load the Excel file
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile('path/to/your/excel/file.xlsx');

    // Extract data from the Excel file
    const worksheet = workbook.getWorksheet(1);
    const rows = worksheet.getRows(2, worksheet.rowCount - 1);

    // Prepare the SQL query and insert the data
    for (const row of rows) {
      const query = 'INSERT INTO your_table (column1, column2, column3) VALUES (?, ?, ?)';
      const values = [row.getCell(1).value, row.getCell(2).value, row.getCell(3).value];

      await connection.execute(query, values);
    }

    // Close the database connection
    await connection.end();
    console.log('Upload complete!');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

uploadExcelToMySQL();

