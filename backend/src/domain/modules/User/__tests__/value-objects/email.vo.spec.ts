import { Email } from '../../values-objects/email.vo';

describe('Email VO', () => {
	it('should create a valid email', () => {
		const email = Email.create('USER@Email.com');

		expect(email.getValue()).toBe('user@email.com');
	});

	it('should throw error for invalid email', () => {
		expect(() => Email.create('invalid-email')).toThrow('Invalid e-mail');
	});

	it('should compare two equal emails', () => {
		const email1 = Email.create('test@email.com');
		const email2 = Email.create('TEST@email.com');

		expect(email1.compare(email2)).toBe(true);
	});
});
