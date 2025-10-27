import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comments-repository';
import { DeleteQuestionCommentUseCase } from './delete-question-comment';
import { makeQuestionComment } from 'test/factories/make-question-comment';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository;
let sut: DeleteQuestionCommentUseCase;

describe('Delete question comment', () => {
	beforeEach(() => {
		inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository();
		sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentRepository);
	});

	it('should be able delete a question comment', async () => {
		const questionComment = makeQuestionComment();

		await inMemoryQuestionCommentRepository.create(questionComment);

		await sut.execute({
			questionCommentId: questionComment.id.toString(),
			authorId: questionComment.authorId.toString(),
		});

		expect(inMemoryQuestionCommentRepository.items).toHaveLength(0);
	});

	it('should not be able delete another user question comment', async () => {
		const questionComment = makeQuestionComment({
			authorId: new UniqueEntityID('author-1'),
		});

		await inMemoryQuestionCommentRepository.create(questionComment);

		expect(() => {
			return sut.execute({
				questionCommentId: questionComment.id.toString(),
				authorId: 'author-2',
			});
		}).rejects.toBeInstanceOf(Error);
	});
});
