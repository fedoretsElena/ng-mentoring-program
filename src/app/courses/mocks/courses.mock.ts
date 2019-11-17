import { ICourse } from '../entitites';

export const courses: ICourse[] = [{
  id: 1,
  title: 'Angular JS for novice',
  description: 'Angular - is one of the most famous and fast growing frameworks in our days.' +
    ' This course will cover all topics needed to start your own Angular application.',
  creationDate: '2019-11-02',
  duration: 59,
  topRated: true
}, {
  id: 2,
  title: 'Introduction to front-end fundamentals',
  description: 'This training dives into the fundamentals of front-end web development by ' +
    'getting familiar with HTML, CSS and JavaScript from the very basis.',
  creationDate: '2020-09-12',
  duration: 180
}, {
  id: 3,
  title: 'Basis of presentation excellence',
  description: 'This training session satisfies all the basic needs of junior public speaker: How to ' +
    'start and finish - What to say; How to open your speech.',
  creationDate: '2018-11-11',
  duration: 14
}];
