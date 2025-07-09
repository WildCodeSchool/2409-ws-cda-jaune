import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Plan } from "./Plan";
import { Scenario } from "./Scenario";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

registerEnumType(Role, {
  name: "Roles",
  description: "Roles for users in this app",
});

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Field()
  @Column({ unique: true })
  mail: string;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column()
  hashedPassword: string;

  @Field(() => [Role])
  @Column({ type: "enum", enum: Role, array: true, default: [Role.USER] })
  roles: Role[];

  @Field(() => [Scenario])
  @ManyToMany(() => Scenario, (scenario) => scenario.readers)
  readScenarios: Scenario[];

  @Field(() => [Scenario])
  @OneToMany(() => Scenario, (scenario) => scenario.owner, {
    onDelete: "CASCADE",
  })
  ownedScenarios: Scenario[];

  @Field(() => [Plan])
  @OneToMany(() => Plan, (plan) => plan.owner, {
    onDelete: "CASCADE",
  })
  ownedPlans: Plan[];
}
