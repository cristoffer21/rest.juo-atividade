import { IsString, IsUUID, IsInt, Min } from 'class-validator'

export class AdicionarItemCarrinhoDto {
  @IsString()
  @IsUUID()
  produtoId!: string

  @IsInt()
  @Min(1)
  quantidade!: number
}
