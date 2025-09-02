import { Controller, Post, Body, Param, Get, Delete, Patch } from '@nestjs/common';
import { CartService } from './service/CartService';
import { CartItem } from './model/Cart';
import { ProductService } from './service/ProductService';

@Controller('api/cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService
  ) {}

  @Post(':id')
  createCart(@Param('id') id: string) {
    return this.cartService.createCart(id);
  }

  @Post(':id/item')
  addItem(@Param('id') id: string, @Body() item: CartItem) {
    return this.cartService.addItem(id, item);
  }

  @Post('add')
  addProductToCart(@Body() body: { cartId: string; productId: string; quantity: number }) {
    const product = this.productService.getProductById(body.productId);
    if (!product) {
      return { message: `Product with ID ${body.productId} not found` };
    }
    return this.cartService.addItem(body.cartId, {
      productId: body.productId,
      quantity: body.quantity,
    });
  }

  @Get(':id')
  getCart(@Param('id') id: string) {
    return this.cartService.getCart(id);
  }

  @Get()
  getAllCarts() {
    return this.cartService.getAllCarts();
  }

  @Delete(':id/item/:productId')
  removeItem(@Param('id') id: string, @Param('productId') productId: string) {
    return this.cartService.removeItem(id, productId);
  }

  @Delete('remove')
  removeProductFromCart(@Body() body: { cartId: string; productId: string }) {
    return this.cartService.removeItem(body.cartId, body.productId);
  }

  @Patch(':id/item/:productId')
  updateItemQuantity(
    @Param('id') id: string,
    @Param('productId') productId: string,
    @Body('quantity') quantity: number
  ) {
    console.log(`Updating item in cart ${id}, product ${productId}, quantity ${quantity}`);
    return this.cartService.updateItemQuantity(id, productId, quantity);
  }

  @Delete(':id')
  deleteCart(@Param('id') id: string) {
    const result = this.cartService.deleteCart(id);
    if (result) {
      return { message: `Cart with ID ${id} deleted successfully` };
    }
    return { message: `Cart with ID ${id} not found` };
  }
}
