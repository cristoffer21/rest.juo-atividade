import { IsInt, Min } from 'class-validator'

export class AtualizarItemCarrinhoDto {
  @IsInt()
  @Min(1)
  quantidade!: number
}
