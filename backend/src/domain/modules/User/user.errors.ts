import { DomainError } from '@/domain/errors/domain.error';

export class InvalidUserName extends DomainError {}
export class InvalidEmail extends DomainError {}
export class InvalidPassword extends DomainError {}
