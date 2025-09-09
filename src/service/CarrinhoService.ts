import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { Carrinho } from '../model/Carrinho'
import { ItemCarrinho } from '../model/ItemCarrinho'
import { v4 as uuid } from 'uuid'
import { ProductService } from './ProductService'

@Injectable()
export class CarrinhoService {
  private carrinhos = new Map<string, Carrinho>()

  constructor(private readonly productService: ProductService) {}

  criarCarrinho(): Carrinho {
    const carrinho = new Carrinho()
    carrinho.id = uuid()
    this.carrinhos.set(carrinho.id, carrinho)
    return carrinho
  }

  obterCarrinho(id: string): Carrinho {
    const c = this.carrinhos.get(id)
    if (!c) throw new NotFoundException('Carrinho não encontrado')
    return c
  }

  async adicionarItem(carrinhoId: string, produtoId: string, quantidade: number): Promise<Carrinho> {
    if (quantidade < 1) throw new BadRequestException('Quantidade deve ser ≥ 1')
    const carrinho = this.obterCarrinho(carrinhoId)
    const produto = this.productService.findProductById(produtoId)
    const existente = carrinho.itens.find(i => i.produtoId === produtoId)
    if (existente) {
      existente.quantidade += quantidade
    } else {
      const item = new ItemCarrinho()
      item.produtoId = produto.id
      item.nome = produto.name
      item.precoUnitario = produto.price
      item.quantidade = quantidade
      carrinho.itens.push(item)
    }
    return carrinho
  }

  atualizarItem(carrinhoId: string, produtoId: string, quantidade: number): Carrinho {
    if (quantidade < 1) throw new BadRequestException('Quantidade deve ser ≥ 1')
    const carrinho = this.obterCarrinho(carrinhoId)
    const item = carrinho.itens.find(i => i.produtoId === produtoId)
    if (!item) throw new NotFoundException('Item não encontrado no carrinho')
    item.quantidade = quantidade
    return carrinho
  }

  removerItem(carrinhoId: string, produtoId: string): void {
    const carrinho = this.obterCarrinho(carrinhoId)
    const idx = carrinho.itens.findIndex(i => i.produtoId === produtoId)
    if (idx === -1) throw new NotFoundException('Item não encontrado no carrinho')
    carrinho.itens.splice(idx, 1)
  }
}
