import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';

interface GetQuestionBySlugUseCaseRequest {
	slug: string;
}

interface GetQuestionBySlugUseCaseReponse {
	question: Question;
}

export class GetQuestionBySlugUseCase {
	constructor(private questionRepository: QuestionsRepository) {}
	async execute({
		slug,
	}: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseReponse> {
		const question = await this.questionRepository.findBySlug(slug);
		if (!question) {
			throw new Error('Question not found.');
		}

		return {
			question,
		};
	}
}
