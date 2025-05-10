import { Controller, Get, Query, Req } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';
interface InventoryResponse {
  product: string;
  stock: number;
}

@Controller('inventory')
export class InventoryController {
  constructor(private readonly httpService: HttpService) {}

  @Get('stock')
  async getStock(
    @Query('product') product: string,
    @Req() req: Request, 
  ): Promise<InventoryResponse> {
    const inventoryServiceUrl = process.env.INVENTORY_SERVICE_URL + `/stock/${product}`;
    const token = req.headers.authorization?.replace('Bearer ', '');

    try {
      const response = await firstValueFrom(
        this.httpService.get<InventoryResponse>(inventoryServiceUrl, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );

      return response.data;
    } catch (error) {
      let errorMessage = 'Unknown error occurred';

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      throw new Error(`Failed to fetch inventory: ${errorMessage}`);
    }
  }
}