import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Role } from '../../common/interface/roles';
import { RolesGuard } from './../guard/roles.guard';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { ROLES_KEY } from './roles.decorator';

export function Auth(roles: Role) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
