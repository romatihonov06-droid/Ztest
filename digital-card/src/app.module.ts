import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,   // схема генерируется в памяти из декораторов
      sortSchema: true,
      playground: false,      // встроенный playground отключён
      introspection: true,    // introspection нужен для Apollo Sandbox
    }),
    PrismaModule,
    ProfileModule,
  ],
})
export class AppModule {}
