import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';

interface AnwerQuestionUseCaseRequest {
	instructorId: string;
	questionId: string;
	content: string;
}

interface AnwerQuestionUseCaseResponse {
	answer: Answer;
}

export class AnswerQuestionUseCase {
	constructor(private answersRepository: AnswersRepository) {}
	async execute({
		instructorId,
		questionId,
		content,
	}: AnwerQuestionUseCaseRequest): Promise<AnwerQuestionUseCaseResponse> {
		const answer = Answer.create({
			content,
			authorId: new UniqueEntityID(instructorId),
			questionId: new UniqueEntityID(questionId),
		});

		await this.answersRepository.create(answer);

		return { answer };
	}
}
