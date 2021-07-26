import { createConnection } from "typeorm"

export const testConn = (drop: boolean = false) => {
    return createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "mandragora",
        password: "1234",
        database: "sampledb-typegraphql-test",
        synchronize: drop,
        dropSchema: drop,
        entities: [
            __dirname + "/../entity/*.*"
        ]
    })
}