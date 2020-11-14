import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

import { User } from "../model/user.model";

@Injectable()
export class UserService {
  selectedUser: User = new User();
  users: AngularFireList<User>;

  constructor(private db: AngularFireDatabase) {
    this.getUsers();
  }

  getUsers() {
    this.users = this.db.list("clients");
    return this.users;
  }

  getUserById(id: string) {}

  createUser(data: any) {
    const updatedData = {
      ...data
    };
    this.users.push(updatedData);
  }

  isAdmin(emailId: string) {
    return this.db.list("clients", (ref) =>
      ref.orderByChild("email").equalTo(emailId)
    );
  }

  updateUser(user: User) {
    this.users.update(user.$key, user);
  }
}
