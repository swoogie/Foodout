import { Cart } from './cart';

export interface Order {
  id: number;
  userId: number;
  order: Cart[];
}
