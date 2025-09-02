import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './service/ProductService';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    const product = this.productService.getProductById(id);
    if (!product) {
      return { message: `Product with ID ${id} not found` };
    }
    return product;
  }
}
