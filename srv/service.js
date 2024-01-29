const cds = require("@sap/cds");
const PuppeteerHTMLPDF = require('./lib');
const hbs = require('handlebars');
const { Readable } = require('stream');


module.exports = cds.service.impl(async (service) => {
service.on('READ','file', async (req,res) => {
      
    const htmlPDF = new PuppeteerHTMLPDF();
    const options = {
      format: 'A4',
    }
    htmlPDF.setOptions(options);
  
    const pdfData =  {
      scopeItems: [
        { EventID: '10001', ScopeID: '5000' },
        { EventID: '10002', ScopeID: '2000' },
        { EventID: '10003', ScopeID: '1000' }
      ]
    }
  
    const html = await htmlPDF.readFile(__dirname + '/sample.html','utf8');  
    const template = hbs.compile(html);
    const content = template(pdfData);

  
   // try {
      const pdfBuffer = await htmlPDF.create(content); 


  const readable = new Readable();
  readable.push(pdfBuffer);
  readable.push(null);
  return {
    value: readable,
    $mediaContentType : 'application/pdf',
    $mediaContentDispositionFilename : 'output.pdf', 
    $mediaContentDispositionType : 'inline' 
  }

   

    });

});