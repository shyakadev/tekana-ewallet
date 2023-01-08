import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const SwaggerInit = (app: INestApplication) => {
    const config = new DocumentBuilder()
    .setTitle('TEKANA E-Wallet')
    .setDescription('Documentation for TEKANA E-Wallet API')
    .setVersion('1')
    .addTag('ewallet')
    .build();

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)
}