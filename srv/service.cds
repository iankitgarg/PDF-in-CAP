using {wipro.pdf.db as db} from '../db/schema';


service CatalogService @(path: '/Service'){
  entity file as projection on db.file;

}