import { TaskListIdRequired, TitleRequired } from './errors/task.error';
import { Task, TaskStatus } from './task.entity';

describe('Task entity', () => {
	const validData = {
		taskListId: crypto.randomUUID(),
		title: 'Title example',
		description: 'Description example',
	};
	it('should create an Task:', () => {
		const task = Task.create(validData);
		expect(task).toBeDefined();
	});

	it('should change the status of the Task: ', () => {
		const task = Task.create(validData);
		task.changeStatus(TaskStatus.IN_PROGRESS);

		expect(task).toBeDefined();
	});

	it('should not create an Task without the title: ', () => {
		expect(() =>
			Task.create({
				...validData,
				title: '',
			}),
		).toThrow(TitleRequired);
	});

	it('should not create an Task without the listId: ', () => {
		expect(() =>
			Task.create({
				...validData,
				taskListId: '',
			}),
		).toThrow(TaskListIdRequired);
	});

	it('should update the Task title: ', () => {
		const task = Task.create(validData);
		task.updateTitle('New Title example');

		expect(task).toBeDefined();
	});

	it('should update the Task description: ', () => {
		const task = Task.create(validData);
		task.updateDescription('New description example');

		expect(task).toBeDefined();
	});
});
