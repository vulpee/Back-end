import { RoleTypes } from '@vulpee/js-api';

import { IEstablishment } from '../../app/Types/Models';

const User = use('App/Models/User');
const Role = use('App/Models/Role');
const Establishment = use('App/Models/Establishment');

class UserSeeder {
  public static async createAdmin(establishmentId: number) {
    const user = new User();

    user.first_name = 'John';
    user.last_name = 'Doe';
    user.email = `admin-${establishmentId}@vulpee.com`;
    user.password = 'password';
    user.account_status = 'active';

    await user.save();

    const role = await Role.findBy('type', RoleTypes.Administrator);

    await user.establishments().attach([establishmentId], (row: any) => {
      row.role_id = role.id;
    });

    return user;
  }

  public static async createManager(establishmentId: number) {
    const user = new User();

    user.first_name = 'John';
    user.last_name = 'Doe';
    user.email = `manager-${establishmentId}@vulpee.com`;
    user.password = 'password';
    user.account_status = 'active';

    await user.save();

    const role = await Role.findBy('type', RoleTypes.Manager);

    await user.establishments().attach([establishmentId], (row: any) => {
      row.role_id = role.id;
    });

    return user;
  }

  public static async createViewer(establishmentId: number) {
    const user = new User();

    user.first_name = 'Jane';
    user.last_name = 'Doe';
    user.email = `viewer-${establishmentId}@vulpee.com`;
    user.password = 'password';
    user.account_status = 'active';

    await user.save();

    const role = await Role.findBy('type', RoleTypes.Viewer);

    await user.establishments().attach([establishmentId], (row: any) => {
      row.role_id = role.id;
    });
    return user;
  }

  public async run() {
    const user = new User();

    user.first_name = 'John';
    user.last_name = 'Doe';
    user.email = `admin@vulpee.com`;
    user.password = 'password';
    user.account_status = 'active';

    await user.save();

    const establishments = await Establishment.all();
    const establishmentIds = establishments.rows.map((establishment: IEstablishment) => establishment.id);

    const role = await Role.findBy('type', RoleTypes.Administrator);

    await user.establishments().attach(establishmentIds, (row: any) => {
      row.role_id = role.id;
    });

    await this.createTestUsers();

    return user;
  }

  private async createTestUsers() {
    const testUser1 = new User();

    testUser1.first_name = 'John';
    testUser1.last_name = 'Doe';
    testUser1.email = `test-1@vulpee.com`;
    testUser1.password = 'password';
    testUser1.account_status = 'active';

    await testUser1.save();

    const establishments = await Establishment.all();
    const establishmentIds = establishments.rows.map((establishment: IEstablishment) => establishment.id);

    const role = await Role.findBy('type', RoleTypes.Administrator);

    await testUser1.establishments().attach(establishmentIds, (row: any) => {
      row.role_id = role.id;
    });

    const testUser2 = new User();

    testUser2.first_name = 'John';
    testUser2.last_name = 'Doe';
    testUser2.email = `test-2@vulpee.com`;
    testUser2.password = 'password';
    testUser2.account_status = 'active';

    await testUser2.save();

    await testUser2.establishments().attach([1], (row: any) => {
      row.role_id = role.id;
    });
  }
}

export = UserSeeder;
