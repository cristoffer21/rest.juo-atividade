import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common'
import { CarrinhoService } from '../service/CarrinhoService'
import { AdicionarItemCarrinhoDto } from '../dto/AdicionarItemCarrinhoDto'
import { AtualizarItemCarrinhoDto } from '../dto/AtualizarItemCarrinhoDto'
import { Carrinho } from '../model/Carrinho'

@Controller('carrinhos')
export class CarrinhoController {
  constructor(private readonly carrinhoService: CarrinhoService) {}

  @Post()
  async criar(): Promise<Carrinho> {
    return this.carrinhoService.criarCarrinho()
  }

  @Get(':id')
  async obter(@Param('id') id: string): Promise<Carrinho> {
    return this.carrinhoService.obterCarrinho(id)
  }

  @Post(':id/itens')
  async adicionarItem(
    @Param('id') id: string,
    @Body() dto: AdicionarItemCarrinhoDto,
  ): Promise<Carrinho> {
    return this.carrinhoService.adicionarItem(id, dto.produtoId, dto.quantidade)
  }

  @Patch(':id/itens/:produtoId')
  async atualizarItem(
    @Param('id') id: string,
    @Param('produtoId') produtoId: string,
    @Body() dto: AtualizarItemCarrinhoDto,
  ): Promise<Carrinho> {
    return this.carrinhoService.atualizarItem(id, produtoId, dto.quantidade)
  }

  @Delete(':id/itens/:produtoId')
  @HttpCode(204)
  async removerItem(
    @Param('id') id: string,
    @Param('produtoId') produtoId: string,
  ): Promise<void> {
    return this.carrinhoService.removerItem(id, produtoId)
  }
}
