import { Either, left, right } from '@/core/types/either';
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';

interface DeleteAnswerCommentUseCaseRequest {
	authorId: string;
	answerCommentId: string;
}

type DeleteAnswerCommentUseCaseReponse = Either<string, {}>;

export class DeleteAnswerCommentUseCase {
	constructor(private answerCommentRepository: AnswerCommentsRepository) {}

	async execute({
		authorId,
		answerCommentId,
	}: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseReponse> {
		const answerComment = await this.answerCommentRepository.findbyId(
			answerCommentId,
		);
		if (!answerCommentId) {
			return left('Answer comment not found');
		}
		if (answerComment?.authorId.toString() !== authorId) {
			return left('Not allowed');
		}

		await this.answerCommentRepository.delete(answerComment);

		return right({});
	}
}
