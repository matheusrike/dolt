import { CreateTaskListUseCase } from '@/application/useCases/TaskList/createTaskList/createTaskList.usecase';
import { ZodValidationPipe } from '@/infra/pipes/zod-validation.pipe';
import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	UseFilters,
	UsePipes,
} from '@nestjs/common';
import {
	CreateTaskBodySchema,
	CreateTaskListSchema,
	CreateTaskParamsSchema,
	FindTaskListByIdSchema,
	ListTasksSchema,
} from './tasklist.schema';
import type {
	CreateTaskListInput,
	CreateTaskListOutput,
} from '@/application/useCases/TaskList/createTaskList/createTaskList.dto';
import { FindTaskListByIdOutput } from '@/application/useCases/TaskList/findTaskListById/findTaskListById.dto';
import { FindTaskListByIdUsecase } from '@/application/useCases/TaskList/findTaskListById/findTaskListById.usecase';
import { CreateTaskUsecase } from '@/application/useCases/Task/createTask/createTask.usecase';
import { ListTasksUseCase } from '@/application/useCases/TaskList/listTasks/listTasks.usecase';
import { TaskListExceptionFilter } from './tasklist-exception.filter';

@Controller('tasklist')
@UseFilters(new TaskListExceptionFilter())
export class TaskListController {
	constructor(
		private readonly createTaskListUsecase: CreateTaskListUseCase,
		private readonly findTaskListByIdUsecase: FindTaskListByIdUsecase,
		private readonly createTaskUsecase: CreateTaskUsecase,
		private readonly listTasksUsecase: ListTasksUseCase,
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
	async create(
		@Body() Body: CreateTaskListInput,
	): Promise<CreateTaskListOutput> {
		return await this.createTaskListUsecase.execute(Body);
	}
	@Get(':id/tasks')
	@UsePipes(new ZodValidationPipe(ListTasksSchema))
	async listTasks(@Param() Param: { id: string }) {
		return await this.listTasksUsecase.execute({ taskListId: Param.id });
	}

	@Post(':id/tasks')
	async createTask(
		@Param(new ZodValidationPipe(CreateTaskParamsSchema))
		Param: { id: string },
		@Body(new ZodValidationPipe(CreateTaskBodySchema))
		Body: { title: string; description: string },
	) {
		return await this.createTaskUsecase.execute({
			taskListId: Param.id,
			title: Body.title,
			description: Body.description,
		});
	}
}
