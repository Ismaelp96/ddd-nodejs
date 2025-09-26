import { beforeEach, describe, expect, it } from 'vitest';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DeleteAnswerUseCase } from './delete-answer';

import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe('Delete Answer', () => {
	beforeEach(() => {
		inMemoryAnswerRepository = new InMemoryAnswersRepository();
		sut = new DeleteAnswerUseCase(inMemoryAnswerRepository);
	});
	it('should be able delete a answer', async () => {
		const newAnswer = makeAnswer(
			{
				authorId: new UniqueEntityID('author-1'),
			},
			new UniqueEntityID('answer-1'),
		);

		await inMemoryAnswerRepository.create(newAnswer);

		await sut.execute({ authorId: 'author-1', answerId: 'answer-1' });

		expect(inMemoryAnswerRepository.items).toHaveLength(0);
	});

	it('should not be able delete a answer from another user', async () => {
		const newAnswer = makeAnswer(
			{ authorId: new UniqueEntityID('author-1') },
			new UniqueEntityID('answer-1'),
		);

		await inMemoryAnswerRepository.create(newAnswer);
		await expect(() =>
			sut.execute({ authorId: 'author-2', answerId: 'answer-1' }),
		).rejects.toBeInstanceOf(Error);
	});
});
