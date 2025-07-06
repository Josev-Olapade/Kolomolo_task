import handler from "../index";
import { test, expect } from "@jest/globals";

import { dbClient, TableNames, UserRoles } from "./../src/common/db";

test("Disallowed", async () => {
  await dbClient
    .put({
      TableName: TableNames.users,
      Item: {
        pk: "auth-user",
        role: UserRoles.basicuser,
      },
    })
    .promise();

  await dbClient
    .put({
      TableName: TableNames.actions,
      Item: {
        pk: "auth-1",
        handler: "COUNTER",
        ROLE: UserRoles.basicuser,
      },
    })
    .promise();

  const { statusCode } = await handler({
    Headers: { userid: "auth-user" },
    body: JSON.stringify({ actionid: "auth-1" }),
  });

  expect(statusCode).toBe(200);

  // remove test items

  await dbClient
    .delete({
      TableName: TableNames.users,
      Key: {
        pk: "auth-user",
      },
    })
    .promise();

  await dbClient
    .delete({
      TableName: TableNames.actions,
      Key: {
        pk: "auth-1",
      },
    })
    .promise();
});

test("Allowed", async () => {
  await dbClient
    .put({
      TableName: TableNames.users,
      Item: {
        pk: "auth-user",
        role: UserRoles.enterprise,
      },
    })
    .promise();

  await dbClient
    .put({
      TableName: TableNames.actions,
      Item: {
        pk: "auth-1",
        handler: "COUNTER",
        ROLE: UserRoles.sysadmin,
      },
    })
    .promise();

  const { statusCode } = await handler({
    Headers: { userid: "auth-user" },
    body: JSON.stringify({ actionid: "auth-1" }),
  });

  expect(statusCode).toBe(403);

  await dbClient
    .delete({
      TableName: TableNames.users,
      Key: {
        pk: "auth-user",
      },
    })
    .promise();
  await dbClient
    .delete({
      TableName: TableNames.actions,
      Key: {
        pk: "auth-1",
      },
    })
    .promise();
});
