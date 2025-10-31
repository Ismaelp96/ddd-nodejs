import { Either, left, right } from '@/core/types/either';
import { AnswersRepository } from '../repositories/answers-repository';

interface DeleteAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
}

type DeleteAnswerUseCaseReponse = Either<string, {}>;

export class DeleteAnswerUseCase {
	constructor(private answerRepository: AnswersRepository) {}

	async execute({
		authorId,
		answerId,
	}: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseReponse> {
		const answer = await this.answerRepository.findById(answerId);

		if (!answer) {
			return left('Answer not found');
		}

		if (authorId !== answer.authorId.toString()) {
			return left('Not allowed');
		}

		await this.answerRepository.delete(answer);

		return right({});
	}
}
