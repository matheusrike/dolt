import { UserRepository } from '@/domain/repositories/User.repository';
import { FindUserByIdInput, FindUserByIdOutput } from './findUserById.dto';
import { UserNotFound } from '../user-usecase.errors';

export class FindUserByIdUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(input: FindUserByIdInput): Promise<FindUserByIdOutput> {
		const user = await this.userRepository.findById(input.id);
		if (!user) {
			throw new UserNotFound('User not found');
		}
		return {
			name: user.Name,
			email: user.Email,
			isActive: user.isActive,
		};
	}
}
