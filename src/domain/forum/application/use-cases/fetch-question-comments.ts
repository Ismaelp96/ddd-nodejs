import { Either, right } from '@/core/types/either';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionsCommentsRepository } from '../repositories/question-comments-repository';

interface FetchQuestionCommentsUseCaseRequest {
	questionId: string;
	page: number;
}

type FetchQuestionCommentsUseCaseReponse = Either<
	null,
	{
		questionComments: QuestionComment[];
	}
>;

export class FetchQuestionCommentsUseCase {
	constructor(
		private questionCommentsRepository: QuestionsCommentsRepository,
	) {}
	async execute({
		page,
		questionId,
	}: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseReponse> {
		const questionComments =
			await this.questionCommentsRepository.findManyQuestionId(questionId, {
				page,
			});

		return right({
			questionComments,
		});
	}
}
