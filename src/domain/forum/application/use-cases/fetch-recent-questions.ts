import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';

interface FetchRecentQuestionsUseCaseRequest {
	page: number;
}

interface FetchRecentQuestionsUseCaseReponse {
	questions: Question[];
}

export class FetchRecentQuestionsUseCase {
	constructor(private questionRepository: QuestionsRepository) {}
	async execute({
		page,
	}: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseReponse> {
		const questions = await this.questionRepository.findManyRecent({ page });

		return {
			questions,
		};
	}
}
