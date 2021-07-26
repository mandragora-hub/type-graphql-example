// import { graphql } from "graphql";
import { gCall } from "../../../test-utils/gCall";
import { Connection } from "typeorm"
import { testConn } from "../../../test-utils/testConn";

let conn: Connection;
beforeAll(async () => {
    conn = await testConn();
})

afterAll(async () => {
    await conn.close();
})

const registerMutation = `
mutation RegisterMutation($data: RegisterInput!) {
    register(data: $data) {
      id
      firstName
      lastName
      email
      name
    }
  }
  `;

describe('Register', () => {
    it("create user", async () => {
        console.log(await gCall({
            source: registerMutation,
            variableValues: {
                data: {
                    firstName: "test",
                    lastName: "test",
                    email: "email@email.com",
                    password: "test"
                }
            }
        }))
    })
});