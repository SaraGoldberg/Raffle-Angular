import { Catagory } from './catagory.model';
import { OrderItem } from './orderItem.model';

export interface Product {
  catagoryId: number;
  productDescription: string;
  productId: number;
  productImage: string;
  productName: string;
  productPrice: number;
  orderItem: Array<OrderItem>;
}
