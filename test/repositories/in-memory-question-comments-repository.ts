import { QuestionsCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository copy';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';

export class InMemoryQuestionCommentRepository
	implements QuestionsCommentsRepository
{
	public items: QuestionComment[] = [];

	async create(questionComment: QuestionComment) {
		this.items.push(questionComment);
	}
}
