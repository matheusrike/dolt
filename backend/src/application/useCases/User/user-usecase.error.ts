import { UsecaseError } from '@application/shared/usecase.error';

export class UserAlreadyExists extends UsecaseError {}
export class UserNotFound extends UsecaseError {}
