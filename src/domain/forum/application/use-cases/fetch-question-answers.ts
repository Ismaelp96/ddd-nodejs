import { Answer } from '../../enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';

interface FetchQuestionAnswersUseCaseRequest {
	questionId: string;
	page: number;
}

interface FetchQuestionAnswersUseCaseReponse {
	answers: Answer[];
}

export class FetchQuestionAnswersUseCase {
	constructor(private answerRepository: AnswersRepository) {}
	async execute({
		page,
		questionId,
	}: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseReponse> {
		const answers = await this.answerRepository.findManyQuestionId(questionId, {
			page,
		});

		return {
			answers,
		};
	}
}
