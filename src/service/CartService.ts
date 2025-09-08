
import { Injectable } from '@nestjs/common';
import { Cart, CartItem } from '../model/Cart';
import { products } from '../data/Products';

@Injectable()
export class CartService {
  private carts: Cart[] = [];

  updateItemProductId(cartId: string, oldProductId: string, newProductId: string, quantity: number): Cart | undefined {
    // Verifica se o novo produto existe
    const productExists = products.some(p => p.id === newProductId);
    if (!productExists) {
      throw new Error('Produto não encontrado');
    }
    const cart = this.carts.find(c => c.id === cartId);
    if (cart) {
      // Remove o item antigo
      cart.items = cart.items.filter(i => i.productId !== oldProductId);
      // Adiciona o novo item
      cart.items.push({ productId: newProductId, quantity });
      return cart;
    }
    return undefined;
  }



  createCart(id: string): Cart {
    const cart: Cart = { id, items: [] };
    this.carts.push(cart);
    return cart;
  }

  addItem(cartId: string, item: CartItem): Cart | undefined {
    // Verifica se o produto existe
    const productExists = products.some(p => p.id === item.productId);
    if (!productExists) {
      throw new Error('Produto não encontrado');
    }
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

  getCart(cartId: string): any {
    const cart = this.carts.find(c => c.id === cartId);
    if (!cart) return undefined;
    // Filtra itens inválidos e retorna produto completo
    const items = cart.items
      .filter(i => i.productId && typeof i.quantity === 'number' && i.quantity > 0)
      .map(i => {
        const product = products.find(p => p.id === i.productId);
        return product
          ? { product, quantity: i.quantity }
          : null;
      })
      .filter(Boolean);
    return { id: cart.id, items };
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
