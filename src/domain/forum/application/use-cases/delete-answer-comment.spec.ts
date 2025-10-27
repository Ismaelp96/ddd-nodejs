import { beforeEach, describe, expect, it } from 'vitest';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DeleteAnswerCommentUseCase } from './delete-answer-comment';

import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { makeAnswerComment } from 'test/factories/make-answer-comment';

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository;
let sut: DeleteAnswerCommentUseCase;

describe('Delete question comment', () => {
	beforeEach(() => {
		inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository();
		sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentRepository);
	});

	it('should be able delete a answer comment', async () => {
		const answerComment = makeAnswerComment();

		await inMemoryAnswerCommentRepository.create(answerComment);

		await sut.execute({
			answerCommentId: answerComment.id.toString(),
			authorId: answerComment.authorId.toString(),
		});

		expect(inMemoryAnswerCommentRepository.items).toHaveLength(0);
	});

	it('should not be able delete another user answer comment', async () => {
		const answerComment = makeAnswerComment({
			authorId: new UniqueEntityID('author-1'),
		});

		await inMemoryAnswerCommentRepository.create(answerComment);

		expect(() => {
			return sut.execute({
				answerCommentId: answerComment.id.toString(),
				authorId: 'author-2',
			});
		}).rejects.toBeInstanceOf(Error);
	});
});
