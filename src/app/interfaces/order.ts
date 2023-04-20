import { Cart } from './cart';

export interface Order {
  id: number;
  order: Cart[];
}
