import { InvalidTaskListName, UserIdRequired } from '../tasklist.error';
import { TaskList } from '../taskList.entity';

describe('TaskList entity ', () => {
	const validData = {
		userId: crypto.randomUUID(),
		name: 'Example name',
	};

	it('should create a TaskList: ', () => {
		const taskList = TaskList.create(validData);

		expect(taskList).toBeDefined();
	});

	it('should not create a Tasklist without name: ', () => {
		expect(() => TaskList.create({ ...validData, name: '' })).toThrow(
			InvalidTaskListName,
		);
	});

	it('should not create a TaskList without the userId: ', () => {
		expect(() => TaskList.create({ ...validData, userId: '' })).toThrow(
			UserIdRequired,
		);
	});

	it('should change the TaskList name: ', () => {
		const taskList = TaskList.create(validData);
		taskList.changeName('New name example');

		expect(taskList).toBeDefined();
	});
});
