import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Permission } from './models/permission.entity';
import { PermissionService } from './permission.service';

@Controller('permissions')
@UseGuards(AuthGuard)
export class PermissionController {
    constructor(
        private permissionService: PermissionService,
    ) { }

    @Get()
    async all(): Promise<Permission[]> {
        return this.permissionService.all();
    }
}
