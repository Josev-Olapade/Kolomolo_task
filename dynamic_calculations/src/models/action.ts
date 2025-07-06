import Role from "./role";

import { dbClient, TableNames } from "../common/db";
import Handler from "../handlers/index";

export class Action {
  id;
  parentActionId;
  parentRule;
  parentRuleId;
  role;
  handler;
  data;

  constructor(input) {
    this.id = input.id || input.pk;
    this.parentRule = input.parentRule;
    this.parentRuleId = input.parentRuleId;
    this.parentActionId = input.parentActionId;
    this.role = Role.from(input.role || input.ROLE);
    this.handler = Handler.from(input);
    this.data = input.data;
  }

  static async getById(id) {
    const res = (await dbClient.get({ TableName: TableNames.actions, Key: { pk: id } }).promise())
      .Item;

    if (!res) {
      throw new Error("Action does not exist");
    }

    return new Action(res);
  }

  async getParentAction() {
    const res = (
      await dbClient
        .get({ TableName: TableNames.actions, Key: { pk: this.parentRuleId } })
        .promise()
    ).Item;

    if (!res) {
      throw new Error("Rule does not exist");
    }

    return new Action(res);
  }

  async getChildActions() {
    const res = await dbClient
      .scan({
        TableName: TableNames.actions,
      })
      .promise();

    if (!res.Items) {
      return [];
    }

    // Filter child actions in JavaScript
    const childActions = res.Items.filter(item => item.parentActionId === this.id);
    return childActions.map((item) => new Action(item));
  }
}
