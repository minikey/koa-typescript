import 'reflect-metadata';
import { createConnection } from 'typeorm';

function db() {
  return createConnection().catch((error) => console.log(error));
}
 
export {
  db
};
