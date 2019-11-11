import { OrderByPipe } from './order-by.pipe';
import { SearchByPipe } from './search-by.pipe';

export const pipes = [
  OrderByPipe,
  SearchByPipe
];

export * from './order-by.pipe';
export * from './search-by.pipe';
