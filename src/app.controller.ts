import { Controller, Get, Param } from '@nestjs/common'
import { AppService } from './app.service'
import { Product } from './model/Product'
import { ProductService } from './service/ProductService'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly productService: ProductService,
  ) {}

  @Get()
  getHealth(): string {
    return this.appService.getHealth()
  }

  @Get('product/:id')
  getProduct(@Param('id') id: string) {
    return this.productService.findProductById(id);
  }
}
