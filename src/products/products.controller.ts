import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  OnModuleInit,
  Query,
} from '@nestjs/common';
import { PRODUCT_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PaginationDto } from '../common';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct() {
    return 'Crea un producto';
  }

  @Get()
  findAllProducts(@Query() pagination: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all_product' },pagination );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'Regresa el producto ' + id;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return 'Elimina el producto ' + id;
  }

  @Patch(':id')
  patchProduct(@Param('id') id: string, @Body() body: any) {
    return 'Actualiza el producto: ' + id;
  }
}
