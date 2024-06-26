import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  username: string;
  @IsNotEmpty({
    message: '昵称不能为空',
  })
  nickName: string;
  @IsNotEmpty({
    message: '密码不能为空',
  })
  @MinLength(6, {
    message: '密码不能少于6位',
  })
  password: string;
  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  @IsEmail(
    {},
    {
      message: '邮箱格式不正确',
    },
  )
  email: string;
  @IsNotEmpty({
    message: '验证码不能为空',
  })
  captcha: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() registerUser: RegisterUserDto) {
    console.log(registerUser);
    return 'success';
  }
}
