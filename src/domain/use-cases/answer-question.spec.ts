import { expect, test } from 'vitest';

import { AnswerQuestionUseCase } from './answer-question';
import { Answer } from '@/domain/entities/answer';
import { AnswersRepository } from '@/domain/repositories/answers-repository';

const fakeAnswersRespository: AnswersRepository = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	create: async (answer: Answer) => {
		return;
	},
};

test('create an answer', async () => {
	const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRespository);

	const answer = await answerQuestion.execute({
		content: 'Nova resposta',
		questionId: '1',
		instructorId: '1',
	});

	expect(answer.content).toEqual('Nova resposta');
});
