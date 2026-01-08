// infra/mappers/MongooseUser.mapper.ts
import { User } from '@/domain/User/entities/user.entity';
import { Email } from '@/domain/User/values-objects/email.vo';
import { Password } from '@/domain/User/values-objects/passwordHash.vo';
import { UserSchema } from '../schemas/mongoose-user.schema';

export class MongooseUserMapper {
	static toPersistence(user: User) {
		return {
			_id: user.Id,
			name: user.Name,
			email: user.Email,
			passwordHash: user.PasswordHash,
			isActive: user.isActive,
		};
	}

	static toDomain(raw: UserSchema): User | null {
		return User.restore({
			id: raw._id,
			name: raw.name,
			email: Email.create(raw.email),
			passwordHash: Password.fromHash(raw.passwordHash),
			isActive: raw.isActive,
		});
	}
}
