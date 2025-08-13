import { expect, test } from 'vitest';

import { AnswerQuestionUseCase } from './answer-question';
import { AnswersRepository } from '../repositories/answers-repository';
import { Answer } from '../entities/answer';

const fakeAnswersRespository: AnswersRepository = {
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
