import { Either, left, right } from '@/core/types/either';
import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetQuestionBySlugUseCaseRequest {
	slug: string;
}

type GetQuestionBySlugUseCaseReponse = Either<
	ResourceNotFoundError,
	{
		question: Question;
	}
>;

export class GetQuestionBySlugUseCase {
	constructor(private questionRepository: QuestionsRepository) {}
	async execute({
		slug,
	}: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseReponse> {
		const question = await this.questionRepository.findBySlug(slug);
		if (!question) {
			return left(new ResourceNotFoundError());
		}

		return right({
			question,
		});
	}
}
