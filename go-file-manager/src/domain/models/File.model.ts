export class FileModel {
  id?: string;
  name: string;
  content?: Buffer;
  targetFolder: string;
  folderId?: string;
}
