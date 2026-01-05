import { UserRepository } from '@/domain/repositories/User.repository';
import { User } from '@/domain/User/entities/user.entity';
import { Email } from '@/domain/User/values-objects/email.vo';
import { Model } from 'mongoose';
import { MongooseUserMapper } from '../mapper/User.mapper';
import { Inject } from '@nestjs/common';
import { UserSchema } from '../schemas/mongoose-user.schema';

export class MongooseUserRepositoy implements UserRepository {
	constructor(
		@Inject(UserSchema.name) private readonly userModel: Model<User>,
	) {}
	async save(user: User): Promise<void> {
		const userDocument = MongooseUserMapper.toPersistence(user);
		await this.userModel.create(userDocument);
	}

	async findByEmail(email: Email): Promise<User> {
		const user = await this.userModel
			.findOne({ email: email.getValue() })
			.lean<UserSchema | null>();
		if (!user) throw new Error('User not found');
		return MongooseUserMapper.toDomain(user);
	}

	async findById(id: string): Promise<User> {
		const user = await this.userModel
			.findOne({ id })
			.lean<UserSchema | null>();
		if (!user) throw new Error('User not found');
		return MongooseUserMapper.toDomain(user);
	}
}
