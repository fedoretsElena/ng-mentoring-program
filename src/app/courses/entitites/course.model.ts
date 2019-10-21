export interface ICourse {
  id: number;
  title: string;
  creationDate: Date;
  duration: number;
  description: string;
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
