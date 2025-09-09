import { Injectable, NotFoundException } from '@nestjs/common'
import { Product } from '../model/Product'
import { ProductGql } from '../model/ProductGql'

@Injectable()
export class ProductService {
  // Mock simples: troque por repositório/DB conforme necessário
  private readonly products: Product[] = [
    { id: '11111111-1111-1111-1111-111111111111', name: 'Teclado Mecânico', price: 350.0 },
    { id: '22222222-2222-2222-2222-222222222222', name: 'Mouse Gamer', price: 199.9 },
    { id: '33333333-3333-3333-3333-333333333333', name: 'Monitor 24"', price: 899.99 },
  ]

  findProductById(id: string): Product {
    const found = this.products.find(p => p.id === id)
    if (!found) throw new NotFoundException('Produto não encontrado')
    return found
  }

  findProductGqlById(id: string): ProductGql {
    const p = this.findProductById(id)
    return { id: p.id, name: p.name, price: p.price }
  }
}
