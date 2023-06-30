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

export class LinkApiDataDto {
  @IsNotEmpty()
  @IsObject()
  usersList: LinkApiExternalUserDto[];
}

export class LinkApiPaginatedItemsDto {
  @IsObject()
  @IsNotEmpty()
  data: LinkApiDataDto;
}
