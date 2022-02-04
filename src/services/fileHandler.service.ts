import * as Handlebars from "handlebars";
import fs from 'fs';
import pdf, { CreateOptions } from 'html-pdf'

export default class FileHandlerService {

  static async jsonToPdf(context) {

    const path = __dirname + '/../templates/report.html';
    const source = fs.readFileSync(path, 'utf-8');
    const template = Handlebars.compile(source);
    const html = template(context);

    const options: CreateOptions = { format: 'Letter' };
    const destinyPath = __dirname +"/../files/";
    pdf.create(html, options).toFile(destinyPath + './report.pdf', (err, res) => {
      if (err) return console.log(err);
    });

    return context;
  }

}