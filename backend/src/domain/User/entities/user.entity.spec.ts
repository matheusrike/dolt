import { FakePasswordHasher } from '../../__tests__/fakes/fake-password-hasher';
import { InvalidUserName } from '../user.error';
import { Email } from '../values-objects/email.vo';
import { Password } from '../values-objects/passwordHash.vo';
import { User } from './User.entity';

describe('User Entity', () => {
	const hasher = new FakePasswordHasher();

	it('should create an active user', async () => {
		const email = Email.create('user@email.com');
		const password = await Password.create('Hash@123', hasher);

		const user = User.create({
			name: 'John',
			email,
			passwordHash: password,
		});

		expect(user).toBeDefined();
	});

	it('should change email', async () => {
		const email1 = Email.create('a@email.com');
		const email2 = Email.create('b@email.com');
		const password = await Password.create('Hash@123', hasher);

		const user = User.create({
			name: 'John',
			email: email1,
			passwordHash: password,
		});

		user.changeEmail(email2);

		expect(email1.compare(email2)).toBe(false);
	});

	it('should change password', async () => {
		const email = Email.create('user@email.com');
		const password1 = await Password.create('Hash@123', hasher);
		const password2 = await Password.create('Hash@456', hasher);

		const user = User.create({
			name: 'John',
			email,
			passwordHash: password1,
		});

		user.changePassword(password2);

		expect(user).toBeDefined();
	});

	it('should not create an user without name', async () => {
		const email = Email.create('user@email.com');
		const password = await Password.create('Hash@123', hasher);

		expect(() =>
			User.create({
				name: '',
				email,
				passwordHash: password,
			}),
		).toThrow(InvalidUserName);
	});
});
