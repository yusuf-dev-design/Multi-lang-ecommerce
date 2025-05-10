import { Controller, Post, Body, Req } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';

interface OrderResponse {
  id: string;
  status: string;
}

@Controller('orders')
export class OrderController {
  constructor(private readonly httpService: HttpService) {}

  @Post()
  async createOrder(
    @Body() body: any,
    @Req() req: Request,
  ): Promise<OrderResponse> {
    const orderServiceUrl = process.env.ORDER_SERVICE_URL + '/orders';
    const token = req.headers.authorization?.replace('Bearer ', '');

    try {
      const response = await firstValueFrom(
        this.httpService.post(orderServiceUrl, body, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );

      return response.data;
    } catch (error) {
      let errorMessage = 'Unknown error occurred'; // ✅ Declare errorMessage

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      throw new Error(`Failed to create order: ${errorMessage}`); // ✅ Now valid
    }
  }
}