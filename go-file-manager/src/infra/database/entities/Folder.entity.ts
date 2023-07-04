import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('folders')
export class FolderEntity {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  parentFolder: string;
}
