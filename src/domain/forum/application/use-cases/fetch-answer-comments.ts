import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';

interface FetchAnswerCommentsUseCaseRequest {
	answerId: string;
	page: number;
}

interface FetchAnswerCommentsUseCaseReponse {
	answerComments: AnswerComment[];
}

export class FetchAnswerCommentsUseCase {
	constructor(private answerCommentsRepository: AnswerCommentsRepository) {}
	async execute({
		page,
		answerId,
	}: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseReponse> {
		const answerComments = await this.answerCommentsRepository.findManyAnswerId(
			answerId,
			{
				page,
			},
		);

		return {
			answerComments,
		};
	}
}
