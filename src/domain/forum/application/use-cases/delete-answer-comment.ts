import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';

interface DeleteAnswerCommentUseCaseRequest {
	authorId: string;
	answerCommentId: string;
}

interface DeleteAnswerCommentUseCaseReponse {}

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
			throw new Error('Answer comment not found');
		}
		if (answerComment?.authorId.toString() !== authorId) {
			throw new Error('Not  allowed');
		}

		await this.answerCommentRepository.delete(answerComment);

		return {};
	}
}
