import { Injectable } from '@nestjs/common';
import { Product } from '../model/Product';

@Injectable()
export class ProductService {
  private products: Product[] = [
    { id: '1', name: 'Product A', price: 100 },
    { id: '2', name: 'Product B', price: 200 },
    { id: '3', name: 'Product C', price: 300 },
  ];

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  findProductById(id: string): Product | undefined {
    return this.getProductById(id); // Reutiliza o método existente
  }

  findProductGqlById(id: string): Product | undefined {
    return this.getProductById(id); // Reutiliza o método existente
  }
}
