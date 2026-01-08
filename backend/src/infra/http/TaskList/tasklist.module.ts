import { CreateTaskListUseCase } from '@/application/useCases/TaskList/createTaskList/createTaskList.usecase';
import {
	TASKLIST_REPOSITORY,
	TaskListRepository,
} from '@/domain/repositories/TaskList.repository';
import {
	USER_REPOSITORY,
	UserRepository,
} from '@/domain/repositories/User.repository';
import { MongooseTaskListModule } from '@/infra/database/mongoose/modules/mongoose-tasklist.module';
import { MongooseUserModule } from '@/infra/database/mongoose/modules/mongoose-user.module';
import { Module } from '@nestjs/common';
import { TaskListController } from './tasklist.controller';

@Module({
	imports: [MongooseTaskListModule, MongooseUserModule],
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
			inject: [TASKLIST_REPOSITORY, USER_REPOSITORY],
		},
	],
	controllers: [TaskListController],
})
export class TaskListModule {}
