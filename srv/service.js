const cds = require("@sap/cds");
const PuppeteerHTMLPDF = require('./lib');
const hbs = require('handlebars');

module.exports = cds.service.impl(async (service) => {
service.on('generatePDF', async (req,res) => {
      
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
    //req.reply("PDF Generated");
  
   // try {
      const pdfBuffer = await htmlPDF.create(content); 

     //...app.get('/download', function(request, response){
  //...  var fileContents = Buffer.from(fileData, "base64");
  //   var readStream = new PassThrough();
  // readStream.end(pdfBuffer);

  // res.set('Content-disposition', 'attachment; filename=output.pdf');
  // res.set('Content-Type', 'text/plain');

  // readStream.pipe(res);
     //  req.setHeader('Content-Type', 'application/pdf');
      //  return pdfBuffer;
      // res.setHeader('Content-Disposition', 'attachment; filename=data.pdf');
        //  let buffer = Buffer.from(pdfBuffer , 'binary');
      // req._.res.set('Content-Type', 'application/pdf');
      //   res.send(pdfBuffer);
    //  res.writeHead(200, {
       // 'Content-Disposition': 'attachment; filename="output.pdf"',
      //  'Content-Type': 'application/pdf',
    //  });
    //  const download = Buffer.from(fileData, 'base64');
   //   res.end(pdfBuffer);
    //  req.reply(pdfBuffer);

  //   const Readable = new Readable();
  //   const result = new Array();
  //   Readable.push(pdfBuffer);
  //  // Readable.push(null);
  //   result.push({value : Readable});
  //   return result;
  
   // } catch (error) {
    //  console.log('PuppeteerHTMLPDF error', error);
   // }

   try {
    let buffer = pdfBuffer;
    req._.res.set('Content-Type', 'application/pdf');
    req._.res.send(buffer);
} catch (error) {
    req.reject(400, error);
}
    });

});