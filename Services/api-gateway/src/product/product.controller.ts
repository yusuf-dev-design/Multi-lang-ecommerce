import { Controller, Get, Query, Req } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

interface ProductResponse {
  id: string;
  name: string;
  price: number;
}

@Controller('products')
export class ProductController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  async getAllProducts(@Query() query: any, @Req() req: any): Promise<ProductResponse[]> {
    const productServiceUrl = process.env.PRODUCT_SERVICE_URL + '/products';
    const token = req.headers.authorization?.replace('Bearer ', '');

    try {
      const response = await firstValueFrom(
        this.httpService.get<ProductResponse[]>(productServiceUrl, {
          params: query,
          headers: { Authorization: `Bearer ${token}` },
        }),
      );

      return response.data;
    } catch (error) {
      let errorMessage = 'An unknown error occurred';

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      throw new Error(`Failed to fetch products: ${errorMessage}`);
    }
  }
}