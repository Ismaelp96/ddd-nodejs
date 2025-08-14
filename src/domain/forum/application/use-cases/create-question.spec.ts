import { expect, test } from 'vitest';

import { QuestionsRepository } from '../repositories/questions-repository';
import { Question } from '../../enterprise/entities/question';
import { CreateQuestionUseCase } from './create-question';

const fakeQuestionsRespository: QuestionsRepository = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	create: async (answer: Question) => {
		return;
	},
};

test('create an answer', async () => {
	const createQuestion = new CreateQuestionUseCase(fakeQuestionsRespository);

	const { question } = await createQuestion.execute({
		authorId: '1',
		title: 'novo titulo',
		content: 'Nova resposta',
	});

	expect(question.id).toBeTruthy();
});
