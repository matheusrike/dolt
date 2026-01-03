import { User } from '@/domain/User/entities/user.entity';
import { Email } from '@/domain/User/values-objects/email.vo';

export interface UserRepository {
	save(user: User): Promise<void>;
	findByEmail(email: Email): Promise<User>;
	findById(id: string): Promise<User>;
}
