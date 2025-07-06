import handler from "../index";
import { beforeAll, test, expect } from "@jest/globals";
import { dbClient, TableNames, UserRoles } from "./../src/common/db";

beforeAll(async () => {
  await dbClient
    .put({
      TableName: "actions",
      Item: {
        pk: "newest-1",
        role: UserRoles.basicuser,
        handler: "NEWEST",
      },
    })
    .promise();
  await dbClient
    .put({
      TableName: TableNames.users,
      Item: {
        pk: "123",
        role: UserRoles.sysadmin,
      },
    })
    .promise();

  await dbClient
    .put({
      TableName: TableNames.actions,
      Item: {
        pk: "newest-2",
        parentActionId: "newest-1",
        data: { timestamp: new Date(2020, 1, 1).toISOString(), color: "red", type: "painting" },
      },
    })
    .promise();

  await dbClient
    .put({
      TableName: TableNames.actions,
      Item: {
        pk: "newest-3",
        parentActionId: "newest-1",
        data: { timestamp: new Date(2010, 1, 1).toISOString(), color: "blue", image: "none" },
      },
    })
    .promise();
});

test("Some items to count", async () => {
  await dbClient;

  const { body } = await handler({
    Headers: { userid: "123" },
    body: JSON.stringify({ actionid: "newest-1" }),
  });

  expect(body).toStrictEqual({
    timestamp: new Date(2020, 1, 1).toISOString(),
    color: "red",
    type: "painting",
  });
});
