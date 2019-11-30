export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
}

export class User implements IUser {
  constructor(
    options: Partial<IUser> = {},
    public id: number = options.id || null,
    public firstName: string = options.firstName || null,
    public lastName: string = options.lastName || null
  ) {
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
