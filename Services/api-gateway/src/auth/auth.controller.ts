import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const userServiceUrl = process.env.USER_SERVICE_URL + '/users/login';

    try {
      const response: AxiosResponse = await firstValueFrom(this.httpService.post(userServiceUrl, body));
      return response.data;
    } catch (error) {
      throw new HttpException('Authentication failed', HttpStatus.UNAUTHORIZED);
    }
  }
}