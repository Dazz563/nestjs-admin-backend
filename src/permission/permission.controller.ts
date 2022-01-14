import { Controller, Get } from '@nestjs/common';
import { Permission } from './models/permission.entity';
import { PermissionService } from './permission.service';

@Controller('permissions')
export class PermissionController {
    constructor(
        private permissionService: PermissionService,
    ) { }

    @Get()
    async all(): Promise<Permission[]> {
        return this.permissionService.all();
    }
}
