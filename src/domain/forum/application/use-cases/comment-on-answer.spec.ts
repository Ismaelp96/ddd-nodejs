import { makeAnswer } from 'test/factories/make-answer';
import { beforeEach, describe, expect, it } from 'vitest';
import { CommentOnAnswerUseCase } from './comment-on-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerUseCase;

describe('Commment on Answer', () => {
	beforeEach(() => {
		inMemoryAnswerRepository = new InMemoryAnswersRepository();
		inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
		sut = new CommentOnAnswerUseCase(
			inMemoryAnswerRepository,
			inMemoryAnswerCommentsRepository,
		);
	});

	it('should be able to cooment on Answer', async () => {
		const answer = makeAnswer();

		await inMemoryAnswerRepository.create(answer);

		await sut.execute({
			answerId: answer.id.toString(),
			authorId: answer.authorId.toString(),
			content: 'Comentário teste',
		});

		expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
			'Comentário teste',
		);
	});
});
