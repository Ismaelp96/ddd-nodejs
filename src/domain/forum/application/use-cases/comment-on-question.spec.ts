import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comments-repository';
import { CommentOnQuestionUseCase } from './comment-on-question';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository;
let sut: CommentOnQuestionUseCase;

describe('Commment on Question', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository();
		sut = new CommentOnQuestionUseCase(
			inMemoryQuestionsRepository,
			inMemoryQuestionCommentRepository,
		);
	});

	it('should be able to cooment on question', async () => {
		const question = makeQuestion();

		await inMemoryQuestionsRepository.create(question);

		await sut.execute({
			questionId: question.id.toString(),
			authorId: question.authorId.toString(),
			content: 'Comentário teste',
		});

		expect(inMemoryQuestionCommentRepository.items[0].content).toEqual(
			'Comentário teste',
		);
	});
});
