import { User } from './user.entity';
import { Email } from './values-objects/email.vo';

export abstract class UserRepository {
	abstract save(data: User): Promise<void> | void;
	abstract findByEmail(email: Email): Promise<User | null> | User | null;
	abstract findById(id: string): Promise<User | null> | User | null;
	abstract list(): Promise<(User | null)[]> | (User | null)[];
}
