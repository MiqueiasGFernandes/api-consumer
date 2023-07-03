import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity("internal_users")
export class InternalUserEntity {
  @ObjectIdColumn()
  id: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  addressNumber: number;

  @Column()
  phoneNumber: string;
}
