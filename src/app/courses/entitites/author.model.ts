export interface Author {
  id: number;
  name: string;
}

export interface IAuthor extends Author {
  lastName?: string;
}

export class Author {
  constructor(options: IAuthor,
              public id = options.id,
              public name = `${options.name} ${options.lastName}`
  ) {}
}
