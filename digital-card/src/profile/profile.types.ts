import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Link {
  @Field(() => Int)
  id: number;

  @Field()
  label: string;

  @Field()
  url: string;
}

@ObjectType()
export class Skill {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  category?: string;
}

@ObjectType()
export class Experience {
  @Field(() => Int)
  id: number;

  @Field()
  company: string;

  @Field()
  position: string;

  @Field()
  startDate: string;

  @Field({ nullable: true })
  endDate?: string;

  @Field(() => [String])
  achievements: string[];
}

@ObjectType()
export class Project {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  url?: string;
}

@ObjectType()
export class Profile {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [Link])
  links: Link[];

  @Field(() => [Skill])
  skills: Skill[];

  @Field(() => [Experience])
  experience: Experience[];

  @Field(() => [Project])
  projects: Project[];
}
