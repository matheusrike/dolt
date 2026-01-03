import { User } from '@/domain/User/entities/user.entity';
import { Email } from '../User/values-objects/email.vo';

export interface UserRepository {
	save(user: User): Promise<void> | void;
	findByEmail(email: Email): Promise<User> | User;
	findById(id: string): Promise<User> | User;
}
