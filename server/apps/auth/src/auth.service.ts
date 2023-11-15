import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signUp(): string {
    return 'Hello World!';
  }
}
