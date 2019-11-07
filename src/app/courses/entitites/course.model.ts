export interface ICourse {
  id: number;
  title: string;
  duration: number;
  description: string;
  topRated?: boolean;
  creationDate: Date | string;
}

export class Course implements ICourse {
  id: number;
  title: string;
  topRated: boolean;
  creationDate: Date;
  duration: number;
  description: string;

  constructor(course) {
    Object.assign(this, course);
  }
}
