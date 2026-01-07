import { Task, TaskStatus } from './Task.entity';

describe('Task entity', () => {
	const validData = {
		listId: crypto.randomUUID(),
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
		).toThrow(Error);
	});

	it('should not create an Task without the listId: ', () => {
		expect(() =>
			Task.create({
				...validData,
				listId: '',
			}),
		).toThrow(Error);
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
