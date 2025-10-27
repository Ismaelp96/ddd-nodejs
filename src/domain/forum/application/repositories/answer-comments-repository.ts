import { AnswerComment } from '../../enterprise/entities/answer-comment';

export interface AnswerCommentsRepository {
	create(answerComment: AnswerComment): Promise<void>;
	findbyId(id: string): Promise<AnswerComment | null>;
	delete(answerComment: AnswerComment): Promise<void>;
}
