import { createConnection } from "typeorm";

createConnection()
    .then(() => console.log("Conexao feita"))
    .catch((err) => console.log("Conexao com problemas: ", err));

