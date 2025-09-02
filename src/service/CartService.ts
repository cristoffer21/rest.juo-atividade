import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart, CartItem } from '../model/Cart';
import { ProductService } from './ProductService';

@Injectable()
export class CartService {
  private carts: Cart[] = [];

  constructor(private readonly productService: ProductService) {}

  createCart(id: string): Cart {
    const cart: Cart = { id, items: [] };
    this.carts.push(cart);
    console.log(`Created Cart: ${JSON.stringify(cart)}`); // Adicionar log para verificar o carrinho criado
    return cart;
  }

  addItem(cartId: string, item: CartItem): Cart | undefined {
    const product = this.productService.getProductById(item.productId);
    if (!product) {
      throw new NotFoundException(`Product with ID ${item.productId} not found`);
    }

    const cart = this.carts.find(c => c.id === cartId);
    if (cart) {
      const existing = cart.items.find(i => i.productId === item.productId); // Certifique-se de usar "productId"
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        cart.items.push(item);
      }
      console.log(`Updated Cart: ${JSON.stringify(cart)}`); // Adicionar log para verificar o estado do carrinho
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

  updateItemQuantity(cartId: string, productId: string, quantity: number): Cart {
    console.log(`Cart ID: ${cartId}, Product ID: ${productId}, New Quantity: ${quantity}`);
    const cart = this.carts.find(c => c.id === cartId);
    console.log(`Found Cart: ${JSON.stringify(cart)}`);
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${cartId} not found`);
    }
    const item = cart.items.find(i => i.productId === productId); // Certifique-se de que "productId" está correto
    console.log(`Found Item: ${JSON.stringify(item)}`);
    if (!item) {
      throw new NotFoundException(`Item with Product ID ${productId} not found in cart`);
    }
    item.quantity = quantity;
    console.log(`Updated item: ${JSON.stringify(item)}`);
    return cart;
  }

  deleteCart(cartId: string): boolean {
    const index = this.carts.findIndex(c => c.id === cartId);
    if (index !== -1) {
      this.carts.splice(index, 1);
      console.log(`Deleted Cart with ID: ${cartId}`);
      return true;
    }
    console.log(`Cart with ID ${cartId} not found`);
    return false;
  }

  getAllCarts(): Cart[] {
    console.log(`All Carts: ${JSON.stringify(this.carts)}`);
    return this.carts;
  }
}
