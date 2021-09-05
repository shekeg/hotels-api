export class CreateUserDto {
  public email: string;
  public password: string;
  public name: string;
  public contactPhone: string;
  public role: 'client' | 'admin' | 'manager';
}
