import { Either, left, right } from '@/core/types/either';
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/not-allowed-error';

interface DeleteAnswerCommentUseCaseRequest {
	authorId: string;
	answerCommentId: string;
}

type DeleteAnswerCommentUseCaseReponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{}
>;

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
			return left(new ResourceNotFoundError());
		}
		if (answerComment?.authorId.toString() !== authorId) {
			return left(new NotAllowedError());
		}

		await this.answerCommentRepository.delete(answerComment);

		return right({});
	}
}
