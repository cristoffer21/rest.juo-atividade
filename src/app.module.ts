import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProductService } from './service/ProductService'
import { ProductResolver } from './app.resolver'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import { join } from 'path'
import { CarrinhoService } from './service/CarrinhoService'
import { CarrinhoController } from './controller/CarrinhoController'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
  ],
  controllers: [AppController, CarrinhoController],
  providers: [AppService, ProductService, ProductResolver, CarrinhoService],
})
export class AppModule {}
