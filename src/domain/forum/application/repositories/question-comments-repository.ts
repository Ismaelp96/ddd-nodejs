import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionComment } from '../../enterprise/entities/question-comment';

export interface QuestionsCommentsRepository {
	create(questionComment: QuestionComment): Promise<void>;
	findbyId(id: string): Promise<QuestionComment | null>;
	delete(questionComment: QuestionComment): Promise<void>;
	findManyQuestionId(
		questionId: string,
		params: PaginationParams,
	): Promise<QuestionComment[]>;
}
