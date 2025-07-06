import { dbClient, TableNames } from "./src/common/db";
import { EventPayload, ResponseType } from "./src/types";
import authorize from "./src/authorize";
import calculate from "./src/calculate";
import { Action } from "./src/models/action";
import User from "./src/models/user";

// The event argument passed here:
// {Headers: {userid: string}, body: string} - parsed body contains {actionid: string}
const handler = async function (event): Promise<any> {
  const { userid } = event.Headers;
  const { actionid } = JSON.parse(event.body);
  try {
    const user = await User.getById(userid);
    const action = await Action.getById(actionid);
    if (!authorize(user, action)) {
      return { statusCode: 403, body: { message: "Forbidden" } };
    }
    const result = await calculate(event);
    return { statusCode: 200, body: result };
  } catch (err) {
    return { statusCode: 500, body: { message: err.message } };
  }
};

export default handler;
