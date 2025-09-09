import { ItemCarrinho } from './ItemCarrinho'

export class Carrinho {
  id!: string
  itens: ItemCarrinho[] = []
  get quantidadeTotal(): number {
    return this.itens.reduce((acc, i) => acc + i.quantidade, 0)
  }
  get valorTotal(): number {
    return this.itens.reduce((acc, i) => acc + i.subtotal, 0)
  }
}
