import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/api/v1')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

  app.enableCors({
    origin: '*',
    allowedHeaders: 'Access-Control-Allow-Origin, Content-Type',
    methods: 'GET,PATCH,POST,DELETE',
    preflightContinue: false,
  })

  const PORT = process.env.PORT
  await app.listen(PORT)

  console.log('Server running on port', PORT, '🚀')
}
bootstrap()
