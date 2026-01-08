import { User } from '@/domain/User/entities/User.entity';
import { Email } from '@/domain/User/values-objects/email.vo';
import { UserRepository } from '@domain/repositories/User.repository';

export class InMemoryUserRepository implements UserRepository {
	private usersList = new Map<string, User>();

	save(data: User): void {
		const id = data.Id;
		this.usersList.set(id, data);
	}

	findById(id: string): Promise<User> | User {
		const user = this.usersList.get(id);
		if (!user) throw new Error('User not found');
		return user;
	}

	findByEmail(email: Email): User {
		for (const user of this.usersList.values()) {
			if (user.Email === email.getValue()) return user;
		}
		throw new Error('User not found');
	}

	list(): Promise<User[]> | User[] {
		return Array.from(this.usersList.values());
	}
}
