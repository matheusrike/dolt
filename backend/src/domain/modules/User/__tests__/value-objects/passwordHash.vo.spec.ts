import { FakePasswordHasher } from '../../__tests__/fakes/fake-password-hasher';
import { Password } from '../../values-objects/passwordHash.vo';

describe('Password VO', () => {
	const hasher = new FakePasswordHasher();

	it('should create a hashed password', async () => {
		const password = await Password.create('Strong#123', hasher);

		expect(password.getHash()).toBe('hashed-Strong#123');
	});

	it('should throw error for weak password', async () => {
		await expect(Password.create('weak', hasher)).rejects.toThrow(
			'Invalid Password',
		);
	});
});
