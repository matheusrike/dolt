import { UserRepository } from '@/domain/repositories/User.repository';
import { User } from '@/domain/User/entities/user.entity';
import { Email } from '@/domain/User/values-objects/email.vo';
import { Model } from 'mongoose';
import { MongooseUserMapper } from '../mapper/mongoose-user.mapper';
import { Injectable } from '@nestjs/common';
import { UserDocument, UserSchema } from '../schemas/mongoose-user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MongooseUserRepositoy implements UserRepository {
	constructor(
		@InjectModel(UserSchema.name)
		private readonly userModel: Model<UserDocument>,
	) {}
	async save(data: User): Promise<void> {
		const user = MongooseUserMapper.toPersistence(data);
		await this.userModel.create(user);
	}

	async findByEmail(email: Email): Promise<User | null> {
		const user = await this.userModel
			.findOne({ email: email.getValue() })
			.lean<UserSchema | null>();
		if (!user) return null;
		return MongooseUserMapper.toDomain(user);
	}

	async findById(id: string): Promise<User | null> {
		const user = await this.userModel.findById(id);
		if (!user) throw new Error('User not found');
		return MongooseUserMapper.toDomain(user);
	}

	async list(): Promise<(User | null)[]> {
		const users = await this.userModel.find().lean<UserSchema[]>();
		return users.map((user) => MongooseUserMapper.toDomain(user));
	}
}
