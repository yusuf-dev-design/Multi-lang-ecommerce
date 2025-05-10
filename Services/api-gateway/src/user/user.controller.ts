import { Controller, Get, Req } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';

interface UserResponse {
  id: string;
  username: string;
  email: string;
}

@Controller('users')
export class UserController {
  constructor(private readonly httpService: HttpService) {}

  @Get('me')
  async getProfile(@Req() req: Request): Promise<UserResponse> {
    const userServiceUrl = process.env.USER_SERVICE_URL + '/users/me';
    const token = req.headers.authorization?.replace('Bearer ', '');

    try {
      const response = await firstValueFrom(
        this.httpService.get<UserResponse>(userServiceUrl, {
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

      throw new Error(`Failed to fetch user profile: ${errorMessage}`);
    }
  }
}