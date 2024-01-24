import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';

import { Users } from './users/users.entity';
import { Product } from './product/product.entity';
import { ProductCategory } from './product-category/product-category.entity';

import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { ProductCategoryModule } from './product-category/product-category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'manny.db.elephantsql.com',
      port: 5432,
      username: 'owgdbnfk',
      password: 'wPqaKmeU50LxMC1nKTizd0G3LDmEQc2S',
      database: 'owgdbnfk',
      entities: [Users, ProductCategory, Product],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    AuthModule,
    ProductModule,
    ProductCategoryModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
