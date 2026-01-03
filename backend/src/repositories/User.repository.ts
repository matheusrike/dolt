import { User } from '@/domain/User/entities/user.entity';

export interface UserRepository {
	save(user: User): Promise<void>;
	findByEmail(email: string): Promise<User>;
	findById(id: string): Promise<User>;
}
