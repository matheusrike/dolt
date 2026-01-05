import { User } from '@/domain/User/entities/user.entity';
import { Email } from '../User/values-objects/email.vo';

export interface UserRepository {
	save(user: User): Promise<void> | void;
	findByEmail(email: Email): Promise<User> | User;
	findById(id: string): Promise<User> | User;
	list(): Promise<User[]> | User[];
}

export const USER_REPOSITORY = Symbol('UserRepository');

export const UserRepositoryToken = () => USER_REPOSITORY;
