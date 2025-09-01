import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { CartService } from './service/CartService';
import { CartItem } from './model/Cart';

import { Delete } from '@nestjs/common';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':id')
  createCart(@Param('id') id: string) {
    return this.cartService.createCart(id);
  }

  @Post(':id/item')
  addItem(@Param('id') id: string, @Body() item: CartItem) {
    return this.cartService.addItem(id, item);
  }

  @Get(':id')
  getCart(@Param('id') id: string) {
    return this.cartService.getCart(id);
  }

  @Delete(':id/item/:productId')
  removeItem(@Param('id') id: string, @Param('productId') productId: string) {
    return this.cartService.removeItem(id, productId);
  }
}
