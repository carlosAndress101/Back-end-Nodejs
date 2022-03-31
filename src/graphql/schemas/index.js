import path from "path";
import { fileLoader, mergeTypes } from "merge-graphql-schemas";

const typesArray = fileLoader(path.join(__dirname, "./types/*.*"), {
  recursive: true,
},
);

export default mergeTypes(typesArray, { all: true });

/***este codigo recursivo nos sirve para agregar todos los archivos en uno solo y asi
 * mandarlo al databas.
 */
