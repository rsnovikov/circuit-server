import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');

  const PORT = process.env.PORT || 8080;
  await app.listen(PORT, () =>
    console.log('server has beed started on port ' + PORT),
  );
}
bootstrap();
