import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Scenario } from "./Scenario";
import { User } from "./User";

@Entity()
@ObjectType()
export class Plan extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;

  @Field()
  @Column({ length: 64 })
  title!: string;

  @Field()
  @Column("text")
  description!: string;

  @Field()
  @Column()
  pictureUrl!: string;

  @Field((_type) => Scenario)
  @ManyToOne((_type) => Scenario, (scenario) => scenario.plans)
  scenario!: Scenario;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.ownedPlans, { onDelete: "CASCADE" })
  owner!: User;
}
