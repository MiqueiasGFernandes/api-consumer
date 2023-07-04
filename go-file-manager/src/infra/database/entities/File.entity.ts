import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('files')
export class FileEntity {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  targetFolder: string;

  @Column()
  folderId: string;

  @Column()
  e2eId: string;
}
