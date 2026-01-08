import { PipeTransform } from '@nestjs/common';
import { z, ZodError } from 'zod';

type SchemaType = z.ZodType<any, any>;

export class ZodValidationPipe implements PipeTransform {
	constructor(private readonly schema: SchemaType) {}

	transform(value: unknown): unknown {
		const result = this.schema.safeParse(value);

		if (!result.success) {
			throw new ZodError(result.error.issues);
		}

		return result.data;
	}
}
