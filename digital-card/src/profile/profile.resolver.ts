import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile, Skill, Experience, Project, Link } from './profile.types';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  // Корневой запрос: загружает профиль вместе со всеми связями за один SQL-запрос
  @Query(() => Profile, { nullable: true, description: 'Возвращает публичный профиль специалиста' })
  async profile(): Promise<Profile | null> {
    return this.profileService.getProfile() as any;
  }

  // ResolveField-резолверы ниже сработают только если клиент явно запросил
  // соответствующее поле. Если профиль уже загружен с include, данные берутся
  // из объекта parent без дополнительного запроса к БД.

  @ResolveField(() => [Skill])
  async skills(@Parent() profile: Profile): Promise<Skill[]> {
    if ((profile as any).skills) return (profile as any).skills;
    return this.profileService.getSkills(profile.id);
  }

  @ResolveField(() => [Experience])
  async experience(@Parent() profile: Profile): Promise<Experience[]> {
    if ((profile as any).experience) return (profile as any).experience;
    return this.profileService.getExperience(profile.id);
  }

  @ResolveField(() => [Project])
  async projects(@Parent() profile: Profile): Promise<Project[]> {
    if ((profile as any).projects) return (profile as any).projects;
    return this.profileService.getProjects(profile.id);
  }

  @ResolveField(() => [Link])
  async links(@Parent() profile: Profile): Promise<Link[]> {
    if ((profile as any).links) return (profile as any).links;
    return this.profileService.getLinks(profile.id);
  }
}
