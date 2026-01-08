import { UsecaseError } from '@/application/Error/usecase.error';

export class UserAlreadyExists extends UsecaseError {}
export class UserNotFound extends UsecaseError {}
