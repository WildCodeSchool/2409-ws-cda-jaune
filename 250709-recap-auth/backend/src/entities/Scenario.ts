import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Plan } from "./Plan";
import { User } from "./User";

@Entity()
@ObjectType()
export class Scenario extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;

  @Field()
  @Column({ length: 64 })
  title!: string;

  @Field()
  @Column({ length: 256 })
  teaser!: string;

  @Field()
  @Column("text")
  fullStory!: string;

  @Field()
  @Column({ default: "banner.webp" })
  bannerUrl: string;

  @Field()
  @Column({ default: "Non attribué" })
  credits: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.ownedScenarios)
  owner: User;

  @Field(() => [Plan])
  @OneToMany(() => Plan, (plan) => plan.scenario, { onDelete: "CASCADE" })
  plans: Plan[];

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.readScenarios)
  @JoinTable({ name: "usersReadScenarios" })
  readers: User[];
}
