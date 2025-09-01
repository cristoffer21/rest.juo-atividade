import { Injectable } from '@nestjs/common';
import { Cart, CartItem } from '../model/Cart';

@Injectable()
export class CartService {
  private carts: Cart[] = [];

  createCart(id: string): Cart {
    const cart: Cart = { id, items: [] };
    this.carts.push(cart);
    return cart;
  }

  addItem(cartId: string, item: CartItem): Cart | undefined {
    const cart = this.carts.find(c => c.id === cartId);
    if (cart) {
      const existing = cart.items.find(i => i.productId === item.productId);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        cart.items.push(item);
      }
      return cart;
    }
    return undefined;
  }

  getCart(cartId: string): Cart | undefined {
    return this.carts.find(c => c.id === cartId);
  }

  removeItem(cartId: string, productId: string): Cart | undefined {
    const cart = this.carts.find(c => c.id === cartId);
    if (cart) {
      cart.items = cart.items.filter(i => i.productId !== productId);
      return cart;
    }
    return undefined;
  }
}
