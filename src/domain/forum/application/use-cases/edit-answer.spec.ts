import { beforeEach, describe, expect, it } from 'vitest';

import { makeAnswer } from 'test/factories/make-answer';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { EditAnswerUseCase } from './edit-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe('Edit Answer', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new EditAnswerUseCase(inMemoryAnswersRepository);
	});
	it('should be able edit a answer', async () => {
		const newAnswer = makeAnswer(
			{ authorId: new UniqueEntityID('author-1') },
			new UniqueEntityID('answer-1'),
		);

		await inMemoryAnswersRepository.create(newAnswer);
		await sut.execute({
			authorId: 'author-1',
			answerId: newAnswer.id.toValue(),
			content: 'content answer',
		});

		expect(inMemoryAnswersRepository.items[0]).toMatchObject({
			content: 'content answer',
		});
	});

	it('should not be able to edit a answer from another user', async () => {
		const newAnswer = makeAnswer(
			{ authorId: new UniqueEntityID('author-1') },
			new UniqueEntityID('answer-1'),
		);

		await inMemoryAnswersRepository.create(newAnswer);
		await expect(() =>
			sut.execute({
				authorId: 'author-2',
				answerId: 'answer-1',
				content: 'content answer',
			}),
		).rejects.toBeInstanceOf(Error);
	});
});
