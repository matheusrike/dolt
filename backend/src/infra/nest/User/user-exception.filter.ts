import {
	UserAlreadyExists,
	UserNotFound,
} from '@/application/shared/usecase.error';
import {
	InvalidEmail,
	InvalidPassword,
	InvalidUserName,
} from '@/domain/modules/User/user.error';
import {
	BadRequestException,
	Catch,
	ConflictException,
	ExceptionFilter,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Catch()
export class UserExceptionFilter implements ExceptionFilter {
	catch(exception: any) {
		if (exception instanceof ZodError) {
			throw new BadRequestException(
				exception._zod.def.map((error) => error.message),
			);
		}
		if (exception instanceof InvalidEmail) {
			throw new BadRequestException(exception.message);
		}
		if (exception instanceof InvalidUserName) {
			throw new BadRequestException(exception.message);
		}
		if (exception instanceof InvalidPassword) {
			throw new BadRequestException(exception.message);
		}
		if (exception instanceof UserAlreadyExists) {
			throw new ConflictException(exception.message);
		}
		if (exception instanceof UserNotFound) {
			throw new NotFoundException(exception.message);
		}
		throw new InternalServerErrorException(exception);
	}
}
