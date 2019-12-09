export interface IUser {
  id: number;
  name: IName;
  fakeToken: string;
  login: string;
  password: string;
}

export interface IName {
  first: string;
  last: string;
}

export class User implements Partial<IUser> {
  constructor(
    options: Partial<IUser> = {},
    public id: number = options.id || null,
    public firstName: string = options.name && options.name.first || '',
    public lastName: string = options.name && options.name.last || ''
  ) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
