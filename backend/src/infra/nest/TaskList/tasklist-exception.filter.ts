import {
	BadRequestException,
	ExceptionFilter,
	InternalServerErrorException,
} from '@nestjs/common';
import { ZodError } from 'zod';

export class TaskListExceptionFilter implements ExceptionFilter {
	catch(exception: any) {
		if (exception instanceof ZodError) {
			throw new BadRequestException(
				exception._zod.def.map((error) => error.message),
			);
		}
		throw new InternalServerErrorException(exception);
	}
}
