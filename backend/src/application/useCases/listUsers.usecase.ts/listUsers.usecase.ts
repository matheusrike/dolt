import { UserRepository } from '@/domain/repositories/User.repository';
import { ListUsersOutput } from './listUsers.dto';

export class ListUsersUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(): Promise<ListUsersOutput[]> {
		const users = await this.userRepository.list();
		const output = users.map((user) => ({
			id: user!.Id,
			name: user!.Name,
			email: user!.Email,
			isActive: user!.isActive,
		}));

		return output;
	}
}
