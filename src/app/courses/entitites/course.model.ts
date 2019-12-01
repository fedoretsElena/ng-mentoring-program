export interface ICourse {
  id: number;
  title: string;
  duration: number;
  description: string;
  topRated?: boolean;
  authors?: string[];
  creationDate: Date | string;
}

export class Course implements ICourse {
  constructor(
    options: Partial<ICourse> = {},
    public id: number = options.id || null,
    public title: string = options.title || null,
    public topRated: boolean = options.topRated || false,
    public creationDate: Date | string = options.creationDate || new Date(),
    public duration: number = options.duration || null,
    public description: string = options.description || null,
    public authors: string[] = options.authors || []
  ) {}
}
