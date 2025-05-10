import { Controller, Post, Body, Req } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express'; // 👈 Import Request type from Express

interface NotificationResponse {
  message: string;
}

@Controller('notifications')
export class NotificationController {
  constructor(private readonly httpService: HttpService) {}

  @Post('email')
  async sendEmail(
    @Body() body: any,
    @Req() req: Request, // 👈 Now properly typed
  ): Promise<NotificationResponse> {
    const notificationServiceUrl = process.env.NOTIFICATION_SERVICE_URL + '/notify/email';
    const token = req.headers.authorization?.replace('Bearer ', '');

    try {
      const response = await firstValueFrom(
        this.httpService.post(notificationServiceUrl, body, {
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

      throw new Error(`Failed to send email: ${errorMessage}`);
    }
  }
}