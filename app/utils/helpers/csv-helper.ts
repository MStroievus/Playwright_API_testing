import { parse } from 'csv-parse/sync';
import fs from 'fs'


export function csvReader(path: string) {
  const fileContent = fs.readFileSync(path, 'utf-8'); // Читаємо файл як текст в кодуванні UTF-8)
  const content = parse(fileContent, {
    autoParse: true,
    bom: true, // https://csv.js.org/parse/options/bom/ //!It is recommended to always activate this option when working with UTF-8 files.
    columns: true,
    delimiter: [',', ';'], //https://csv.js.org/parse/options/delimiter/
    skip_empty_lines: true,
    on_record: (record) => {
      if (record.password === 'validPassword') {
        record.password = process.env.TEST_USER_PASSWORD!;
      }
      if (record.email === 'validEmail') {
        record.email = process.env.TEST_USER_EMAIL!;
      }
      return record
    }
  })
  return content
}