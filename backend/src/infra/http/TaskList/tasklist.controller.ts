import { CreateTaskListUseCase } from '@/application/useCases/TaskList/createTaskList/createTaskList.usecase';
import { ZodValidationPipe } from '@/infra/pipes/zod-validation.pipe';
import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import {
	CreateTaskListSchema,
	FindTaskListByIdSchema,
} from './tasklist.schema';
import {
	CreateTaskListInput,
	CreateTaskListOutput,
} from '@/application/useCases/TaskList/createTaskList/createTaskList.dto';
import { FindTaskListByIdOutput } from '@/application/useCases/TaskList/findTaskListById/findTaskListById.dto';
import { FindTaskListByIdUsecase } from '@/application/useCases/TaskList/findTaskListById/findTaskListById.usecase';

@Controller('tasklist')
export class TaskListController {
	constructor(
		private readonly createTaskListUsecase: CreateTaskListUseCase,
		private readonly findTaskListByIdUsecase: FindTaskListByIdUsecase,
	) {}

	@Get(':id')
	@UsePipes(new ZodValidationPipe(FindTaskListByIdSchema))
	async getById(
		@Param() Param: { id: string },
	): Promise<FindTaskListByIdOutput> {
		return await this.findTaskListByIdUsecase.execute(Param.id);
	}
	@Post()
	@UsePipes(new ZodValidationPipe(CreateTaskListSchema))
	async handle(
		@Body() Body: CreateTaskListInput,
	): Promise<CreateTaskListOutput> {
		return await this.createTaskListUsecase.execute(Body);
	}
}
