using {wipro.pdf.db as db} from '../db/schema';


service CatalogService @(path: '/Service'){
  function generatePDF() returns Binary;

}