import { RefreshTokenRepository } from '@/infra/nest/Auth/refreshToken.repository';
import {
	RefreshTokenDocument,
	RefreshTokenSchema,
} from '../schemas/mongoose-refreshToken.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MongooseRefreshTokenRepository implements RefreshTokenRepository {
	constructor(
		@InjectModel(RefreshTokenSchema.name)
		private readonly refreshTokenModel: Model<RefreshTokenDocument>,
	) {}

	async save(data: {
		userId: string;
		token: string;
		expiresAt: Date;
	}): Promise<void> {
		await this.refreshTokenModel.create({
			userId: data.userId,
			token: data.token,
			expiresAt: data.expiresAt,
		});
	}

	async findByToken(token: string): Promise<string | null> {
		return await this.refreshTokenModel.findOne({ token });
	}
}
