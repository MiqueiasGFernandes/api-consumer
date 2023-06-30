import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUrl,
} from "class-validator";

export class LinkApiExternalUserDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsUrl()
  avatar: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
}

export class LinkApiListUsersDataDto {
  @IsNotEmpty()
  @IsObject()
  usersList: LinkApiExternalUserDto[];
}

export class LinkApiXmlResponseDto<T> {
  @IsObject()
  @IsNotEmpty()
  data: T;
}
