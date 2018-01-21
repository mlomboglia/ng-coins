export class User {
  public username: string;
  public email: string;
  public password: string;
  public existingPassword: string;
  public confirmPassword: string;
  public verificationCode: string;
  
  constructor(username: string = '',
    email: string = '',
    password: string = '',
    existingPassword: string = '',
    confirmPassword: string = '',
    verificationCode: string = ''
  ) {
  }

}
