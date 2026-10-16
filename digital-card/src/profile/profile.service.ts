import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

// Тип профиля с выбранными связями — определяем один раз, используем везде
type ProfileWithRelations = Prisma.ProfileGetPayload<{
  include: { links: true; skills: true; experience: true; projects: true };
}>;

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  // Загружаем все связанные данные одним запросом, чтобы избежать N+1
  async getProfile(): Promise<ProfileWithRelations | null> {
    return this.prisma.profile.findFirst({
      include: {
        links: true,
        skills: true,
        experience: true,
        projects: true,
      },
    });
  }

  // Точечные методы на случай, если резолвер запросит только часть данных
  async getSkills(profileId: number) {
    return this.prisma.skill.findMany({ where: { profileId } });
  }

  async getExperience(profileId: number) {
    return this.prisma.experience.findMany({ where: { profileId } });
  }

  async getProjects(profileId: number) {
    return this.prisma.project.findMany({ where: { profileId } });
  }

  async getLinks(profileId: number) {
    return this.prisma.link.findMany({ where: { profileId } });
  }
}
