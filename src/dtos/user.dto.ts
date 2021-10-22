export class CreateUserDto {
  email: string;
  names: string;
  lastNames: string;
  phone: string;
  address: string;
  birthdate: string;
  role: number;
}

export class UpdateUserDto{
  names: string;
  lastNames: string;
  phone: string;
  address: string;
  birthdate: string;
  password: string;
}