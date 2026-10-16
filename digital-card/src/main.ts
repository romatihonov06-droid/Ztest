import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS нужен для Apollo Sandbox (sandbox.apollo.dev → localhost)
  app.enableCors();

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 GraphQL API ready at http://localhost:${port}/graphql`);
  console.log(`   Open Apollo Sandbox: https://studio.apollographql.com/sandbox?endpoint=http://localhost:${port}/graphql`);
}

bootstrap();
