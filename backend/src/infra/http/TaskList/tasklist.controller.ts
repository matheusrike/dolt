import { CreateTaskListUseCase } from '@/application/useCases/TaskList/createTaskList/createTaskList.usecase';
import { ZodValidationPipe } from '@/infra/pipes/zod-validation.pipe';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CreateTaskListSchema } from './tasklist.schema';
import {
	CreateTaskListInput,
	CreateTaskListOutput,
} from '@/application/useCases/TaskList/createTaskList/createTaskList.dto';

@Controller('tasklist')
export class TaskListController {
	constructor(
		private readonly createTaskListUsecase: CreateTaskListUseCase,
	) {}

	@Post()
	@UsePipes(new ZodValidationPipe(CreateTaskListSchema))
	async handle(
		@Body() Body: CreateTaskListInput,
	): Promise<CreateTaskListOutput> {
		return await this.createTaskListUsecase.execute(Body);
	}
}
