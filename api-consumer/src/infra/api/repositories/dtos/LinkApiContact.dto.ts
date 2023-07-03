import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";

export class LinkApiContactDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}
