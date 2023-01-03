import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '@tekana-ewallet/shared/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.authService.createUser(createUserDto)
    }
}

