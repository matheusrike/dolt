type UserProps = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export class User {
  private constructor(private userProps: UserProps) {}
}
