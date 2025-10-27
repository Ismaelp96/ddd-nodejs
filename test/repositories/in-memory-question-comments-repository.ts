import { QuestionsCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository copy';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';

export class InMemoryQuestionCommentRepository
	implements QuestionsCommentsRepository
{
	public items: QuestionComment[] = [];

	async create(questionComment: QuestionComment) {
		this.items.push(questionComment);
	}

	async findbyId(id: string) {
		const questionComment = this.items.find(
			(item) => item.id.toString() === id,
		);
		if (!questionComment) {
			return null;
		}
		return questionComment;
	}
	async delete(questionComment: QuestionComment) {
		const itemIndex = this.items.findIndex(
			(item) => item.id === questionComment.id,
		);

		this.items.splice(itemIndex, 1);
	}
}
