import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.project.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.link.deleteMany();
  await prisma.profile.deleteMany();

  await prisma.profile.create({
    data: {
      name: 'Roman Tihonov',
      description:
        'Frontend & Backend developer. Building web apps with React and Node.js, ' +
        'as well as Telegram bots. Currently leveling up through hands-on projects.',
      links: {
        create: [
          { label: 'GitHub', url: 'https://github.com/romatihonov06-droid' },
        ],
      },
      skills: {
        create: [
          { name: 'React', category: 'Frontend' },
          { name: 'JavaScript', category: 'Languages' },
          { name: 'TypeScript', category: 'Languages' },
          { name: 'Node.js', category: 'Backend' },
          { name: 'NestJS', category: 'Backend' },
          { name: 'Telegram Bot API', category: 'Backend' },
          { name: 'GraphQL', category: 'API' },
          { name: 'Prisma', category: 'ORM' },
          { name: 'PostgreSQL', category: 'Databases' },
          { name: 'Docker', category: 'DevOps' },
          { name: 'Git', category: 'Tools' },
        ],
      },
      experience: {
        create: [
          {
            company: 'Academic Projects',
            position: 'Full-Stack Developer (Student)',
            startDate: '2023-09',
            endDate: null,
            achievements: [
              'Built full-stack web applications using React and Node.js',
              'Developed Telegram bots with custom logic and API integrations',
              'Practised working with PostgreSQL and Prisma ORM',
              'Applied Docker for local development environments',
            ],
          },
        ],
      },
      projects: {
        create: [
          {
            name: 'Project',
            description: 'A pet project showcasing frontend and backend skills',
            url: 'https://github.com/romatihonov06-droid/Project',
          },
          {
            name: 'Digital Card',
            description: 'Backend business card API built with NestJS, GraphQL and Prisma',
            url: 'https://github.com/romatihonov06-droid/digital-card',
          },
        ],
      },
    },
  });

  console.log('✅ Database seeded successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
