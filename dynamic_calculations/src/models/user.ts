import { dbClient, TableNames } from "../common/db";
import Role from "./role";

class User {
  id;
  role;

  constructor(input) {
    this.id = input.id;
    this.role = Role.from(input.role);
  }

  static async getById(id) {
    const res = (await dbClient.get({ TableName: TableNames.users, Key: { pk: id } }).promise())
      .Item;

    if (!res) {
      throw new Error("User does not exist");
    }

    return new User(res);
  }
}

export default User;
