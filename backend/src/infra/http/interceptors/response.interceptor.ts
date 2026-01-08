import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class SucessResponseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler) {
		return next.handle().pipe(
			map((data: unknown) => ({
				success: true,
				data,
			})),
		);
	}
}
