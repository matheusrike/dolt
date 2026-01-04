import { UserRepository } from '@/domain/repositories/User.repository';
import { User } from '@/domain/User/entities/user.entity';
import { Email } from '@/domain/User/values-objects/email.vo';
import { model, Schema } from 'mongoose';
import { MongooseUserMapper } from '../mapper/User.mapper';

const UserSchema = new Schema(
	{
		_id: { type: String, required: true },
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		passwordHash: { type: String, required: true },
		isActive: { type: Boolean, default: true },
	},
	{ versionKey: false },
);

const MongooseUser = model('User', UserSchema);
export type MongooseUser = InstanceType<typeof MongooseUser>;

export class MongooseUserRepository implements UserRepository {
	async save(user: User): Promise<void> {
		const data = MongooseUserMapper.toPersistence(user);
		await MongooseUser.create(data);
		return;
	}

	async findByEmail(email: Email): Promise<User> {
		const user = await MongooseUser.findOne({ email });
		if (!user) {
			throw new Error('User not found');
		}
		return MongooseUserMapper.toDomain(user);
	}

	async findById(id: string): Promise<User> {
		const user = await MongooseUser.findById(id);
		if (!user) {
			throw new Error('User not found');
		}
		return MongooseUserMapper.toDomain(user);
	}
}
