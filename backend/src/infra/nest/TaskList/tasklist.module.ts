import { CreateTaskListUseCase } from '@/application/useCases/TaskList/createTaskList/createTaskList.usecase';
import { TaskListRepository } from '@/domain/modules/TaskList/taskList.repository';
import { UserRepository } from '@/domain/modules/User/user.repository';
import { MongooseTaskListModule } from '@/infra/database/mongoose/modules/mongoose-tasklist.module';
import { MongooseUserModule } from '@/infra/database/mongoose/modules/mongoose-user.module';
import { Module } from '@nestjs/common';
import { TaskListController } from './tasklist.controller';
import { FindTaskListByIdUsecase } from '@/application/useCases/TaskList/findTaskListById/findTaskListById.usecase';
import { MongooseTaskModule } from '@/infra/database/mongoose/modules/mongoose-task.module';
import { CreateTaskUsecase } from '@/application/useCases/Task/createTask/createTask.usecase';
import { TaskRepository } from '@/domain/modules/Task/task.repository';
import { ListTasksUseCase } from '@/application/useCases/TaskList/listTasks/listTasks.usecase';

@Module({
	imports: [MongooseTaskListModule, MongooseUserModule, MongooseTaskModule],
	providers: [
		{
			provide: CreateTaskListUseCase,
			useFactory: (
				taskListRepository: TaskListRepository,
				userRepository: UserRepository,
			) => {
				return new CreateTaskListUseCase(
					taskListRepository,
					userRepository,
				);
			},
			inject: [TaskListRepository, UserRepository],
		},
		{
			provide: FindTaskListByIdUsecase,
			useFactory: (taskListRepository: TaskListRepository) => {
				return new FindTaskListByIdUsecase(taskListRepository);
			},
			inject: [TaskListRepository],
		},
		{
			provide: ListTasksUseCase,
			useFactory: (
				taskListRepository: TaskListRepository,
				taskRepository: TaskRepository,
			) => {
				return new ListTasksUseCase(taskListRepository, taskRepository);
			},
			inject: [TaskListRepository, TaskRepository],
		},
		{
			provide: CreateTaskUsecase,
			useFactory: (
				taskRepository: TaskRepository,
				taskListRepository: TaskListRepository,
			) => {
				return new CreateTaskUsecase(
					taskRepository,
					taskListRepository,
				);
			},
			inject: [TaskRepository, TaskListRepository],
		},
	],
	controllers: [TaskListController],
})
export class TaskListModule {}
