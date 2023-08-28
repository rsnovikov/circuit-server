import { User } from '../entities/user.entity';

export class CreateUserDto implements User {
  email: string;
  password: string;
}
