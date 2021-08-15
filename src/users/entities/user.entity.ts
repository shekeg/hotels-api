type Role = 'client' | 'admin' | 'manager';

export class User {
  public _id: string;
  public email: string;
  public passwordHash: string;
  public name: string;
  public contactPhone: string;
  public role: Role;
}
