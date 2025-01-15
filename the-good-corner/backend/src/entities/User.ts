import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column({ unique: true })
  mail!: string;

  @Field()
  @Column()
  hashedPassword!: string;

  @Field()
  @Column()
  roles!: string; // "USER", "ADMIN", "USER,PLAYER" //"CAN_CREATE_SCENARII, CAN_EDIT_ADS"
}
