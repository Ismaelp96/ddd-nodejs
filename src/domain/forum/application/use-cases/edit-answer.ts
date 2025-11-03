import { Either, left, right } from '@/core/types/either';
import { Answer } from '../../enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/not-allowed-error';

interface EditAnswerUserCaseRequest {
	authorId: string;
	answerId: string;
	content: string;
}

type EditAnswerUserCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{
		answer: Answer;
	}
>;

export class EditAnswerUseCase {
	constructor(private answerRepository: AnswersRepository) {}

	async execute({
		answerId,
		authorId,
		content,
	}: EditAnswerUserCaseRequest): Promise<EditAnswerUserCaseResponse> {
		const answer = await this.answerRepository.findById(answerId);

		if (!answer) {
			return left(new ResourceNotFoundError());
		}
		if (authorId !== answer.authorId.toString()) {
			return left(new NotAllowedError());
		}

		answer.content = content;
		await this.answerRepository.save(answer);

		return right({ answer });
	}
}
