import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AbstractService } from './abstract.service';

@Module({
    imports: [
        JwtModule.register({
            secret: 'secret51!@',
            signOptions: { expiresIn: '1d' }
        })
    ],
    exports: [JwtModule],
    providers: [],
})
export class CommonModule { }
