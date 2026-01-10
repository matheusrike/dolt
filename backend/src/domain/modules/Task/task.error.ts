import { DomainError } from '@/domain/shared/domain.error';

export class TitleRequired extends DomainError {}
export class TaskListIdRequired extends DomainError {}
export class InvalidNewTaskTitle extends DomainError {}
