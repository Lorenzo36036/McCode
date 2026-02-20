import { Command, CommandRunner } from 'nest-commander';
import { UsersService } from '../users.service';
import { Role } from '@/common/interface/roles';

@Command({ name: 'create-user', description: 'for created user admin' })
export class CreateUserCommand extends CommandRunner {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async run(params: string[]): Promise<void> {
    const [nombre, email, clave] = params;

    if (!nombre || !email || !clave) {
      console.log('Uso: pnpm cli create-user [nombre] [email] [clave]');
      return;
    }

    if (clave.length < 6) {
      console.log('⚠️  La clave debe tener al menos 6 caracteres.');
      return;
    }

    if (nombre.length < 2) {
      console.log('⚠️  El nombre al menos debe tener 2 caracteres.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('⚠️  El formato del correo electrónico no es válido.');
      return;
    }

    try {
      await this.usersService.create({
        nombre,
        email,
        clave,
        role: Role.Admin,
      });
      console.log('✅ Usuario creado correctamente');
    } catch (e: any) {
      console.error('❌ Error:', e.message);
    }
  }
}
