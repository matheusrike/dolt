import { User } from '@/domain/User/entities/user.entity';
import { Email } from '../User/values-objects/email.vo';

export interface UserRepository {
	save(user: User): Promise<void> | void;
	findByEmail(email: Email): Promise<User | null> | User | null;
	findById(id: string): Promise<User | null> | User | null;
	list(): Promise<(User | null)[]> | (User | null)[];
}

export const USER_REPOSITORY = Symbol('UserRepository');

export const UserRepositoryToken = () => USER_REPOSITORY;
