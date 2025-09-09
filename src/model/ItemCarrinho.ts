export class ItemCarrinho {
  produtoId!: string
  nome!: string
  precoUnitario!: number
  quantidade!: number
  get subtotal(): number {
    return this.precoUnitario * this.quantidade
  }
}
