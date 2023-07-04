import {
  ADD_FILE_USE_CASE,
  IAddFileUseCase,
  IRemoveFileUseCase,
  REMOVE_FILE_USE_CASE,
} from '@domain/use-cases';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpResponse } from '../types/HttpResponse.type';

@Controller('/files')
export class FileController {
  constructor(
    @Inject(ADD_FILE_USE_CASE)
    private readonly addFileUseCase: IAddFileUseCase,
    @Inject(REMOVE_FILE_USE_CASE)
    private readonly removeFileUseCase: IRemoveFileUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() file: any,
    @UploadedFile() fileContent: Express.Multer.File,
  ): Promise<HttpResponse<any>> {
    const data = await this.addFileUseCase.add({
      name: file.name,
      targetFolder: file.targetFolder,
      content: fileContent.buffer,
    });

    return {
      success: true,
      data,
    };
  }

  @Delete()
  @HttpCode(204)
  async delete(@Body() file: any): Promise<HttpResponse<any>> {
    const data = await this.removeFileUseCase.remove(
      file.name,
      file.folderName,
    );

    return {
      success: true,
      data,
    };
  }
}
