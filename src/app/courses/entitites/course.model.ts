import { Author, IAuthor } from './author.model';

export interface ICourse {
  id: number;
  title: string;
  duration: number;
  description: string;
  isTopRated: boolean;
  authors: Author[];
  creationDate: Date | string;
}

// server fields don't have correct names, so we need this interface like 'layer'
export interface IExtendedCourse extends ICourse {
  length: number;
  name: string;
  date: Date | string;
  authors: IAuthor[];
}

export class Course implements Partial<ICourse> {
  constructor(
    options: Partial<IExtendedCourse> = {},
    public id: number = options.id || null,
    public title: string = options.name || options.title || null,
    public isTopRated: boolean = options.isTopRated || false,
    public creationDate: Date | string = options.date || options.creationDate || new Date(),
    public duration: number = options.length || options.duration || null,
    public description: string = options.description || null,
    public authors: Author[] = options.authors ? options.authors.map(person => new Author(person))  : []
  ) {}
}
