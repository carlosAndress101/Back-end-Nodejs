import express from 'express';
import DB_connet from './config/database/db';
import moduloEnv from './config/env/index';
import bodyParser from "body-parser";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import types from "./graphql/schemas";
import resolvers from './graphql/graphql-resolvers';
import { buildSchema } from 'graphql';
import helpers from './Utils/index';


/**LLAMADAS DE EJECUCION */
moduloEnv.settingEnv();
var app = express();
app.use(cors());
DB_connet.connetDB();
const schema = buildSchema(types);
app.use(bodyParser.json());


//consumir el frontend
app.use("/app", express.static("public"));

app.use("/graphql", (req, res) =>
  graphqlHTTP({
    schema, // types
    rootValue: resolvers, //resolvers
    graphiql: true,
    context: {
      customer: helpers.tokenHelpers.getCustomerFromToken(req),
    },
  })(req, res)
);

const DIRECT = process.env.DIRECTION;
const PORT = process.env.PORT;
app.listen(PORT, () => { console.log(`the server are running at the route ${DIRECT}:${PORT}/graphql`);});
