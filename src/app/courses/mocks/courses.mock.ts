import { ICourse } from '../entitites';

export const courses: ICourse[] = [{
  id: 1,
  title: 'Video Course 1. NgRx Store',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi at beatae blanditiis debitis dolore ' +
    'ea exercitationem id ipsam iusto libero molestiae mollitia, quas repellendus sint, ut velit? Perferendis, sequi!',
  duration: 59,
  topRated: true,
  creationDate: '2019-11-02'
}, {
  id: 2,
  title: 'Video Course 2. Angular SSR',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi at beatae blanditiis debitis dolore ' +
    'ea exercitationem id ipsam iusto libero molestiae mollitia, quas repellendus sint, ut velit? Perferendis, sequi!Lorem ipsum Lorem ' +
    'ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi at beatae blanditiis debitis dolore dolor sit ' +
    'amet, consectetur adipisicing elit. Adipisci animi at beatae blanditiis debitis dolore ',
  duration: 180,
  creationDate: '2020-09-12'
}, {
  id: 3,
  title: 'Video Course 3. Apollo GraphQL',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi at beatae blanditiis debitis dolore ' +
    'ea exercitationem id ipsam iusto libero molestiae mollitia, quas repellendus sint, ut velit? ' +
    'Perferendis, sequi! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi at beatae blanditiis debitis dolore ',
  duration: 14,
  creationDate: '2018-11-11'
}];
