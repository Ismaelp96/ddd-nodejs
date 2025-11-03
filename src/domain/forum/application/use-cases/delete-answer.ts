import { Either, left, right } from '@/core/types/either';
import { AnswersRepository } from '../repositories/answers-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/not-allowed-error';

interface DeleteAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
}

type DeleteAnswerUseCaseReponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{}
>;

export class DeleteAnswerUseCase {
	constructor(private answerRepository: AnswersRepository) {}

	async execute({
		authorId,
		answerId,
	}: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseReponse> {
		const answer = await this.answerRepository.findById(answerId);

		if (!answer) {
			return left(new ResourceNotFoundError());
		}

		if (authorId !== answer.authorId.toString()) {
			return left(new NotAllowedError());
		}

		await this.answerRepository.delete(answer);

		return right({});
	}
}
