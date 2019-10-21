export interface ICourse {
  id: number;
  title: string;
  duration: number;
  description: string;
  creationDate: Date | string;
}

export class Course implements ICourse {
  id: number;
  title: string;
  creationDate: Date;
  duration: number;
  description: string;

  constructor(course) {
    Object.assign(this, course);
  }
}
