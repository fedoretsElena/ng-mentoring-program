import { User } from '../../core';

export interface IAuthor {
  id: number;
  name?: string;
  lastName: string;
}

export class Author extends User {
  constructor(options) {
    super(options);

    this.firstName = options.name;
    this.lastName = options.lastName;
  }
}
