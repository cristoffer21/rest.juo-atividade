import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartController } from './CartController';
import { CartService } from './service/CartService';
import { ProductService } from './service/ProductService'
import { ProductResolver } from './app.resolver'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import { join } from 'path'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [AppController, CartController],
  providers: [AppService, CartService, ProductService, ProductResolver],
})
export class AppModule {}
