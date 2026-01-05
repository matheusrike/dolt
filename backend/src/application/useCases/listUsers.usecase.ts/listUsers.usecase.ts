import { UserRepository } from '@/domain/repositories/User.repository';
import { User } from '@/domain/User/entities/user.entity';

export class ListUsersUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(): Promise<User[]> {
		return await this.userRepository.list();
	}
}
