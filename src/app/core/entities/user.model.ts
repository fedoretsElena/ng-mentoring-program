export interface IUser {
  id: number;
  firstName: string;
  lasName: string;
}

export class User implements IUser {
  id: number;
  firstName: string;
  lasName: string;

  constructor(data: IUser) {
    Object.assign(data);
  }
}
