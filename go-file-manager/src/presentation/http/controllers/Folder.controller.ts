import { ADD_FOLDER_USE_CASE, IAddFolderUseCase } from '@domain/use-cases';
import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { HttpResponse } from '../types/HttpResponse.type';

@Controller('/folders')
export class FolderController {
  constructor(
    @Inject(ADD_FOLDER_USE_CASE)
    private readonly addFolderUseCase: IAddFolderUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  async create(@Body() folder: any): Promise<HttpResponse<any>> {
    const data = await this.addFolderUseCase.add(folder);

    return {
      success: true,
      data,
    };
  }
}
