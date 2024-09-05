import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

import { env } from '$env/dynamic/private';

const openai = createOpenAI({
	apiKey: env.OPENAI_API_KEY ?? ''
});

const variants = {
	variant1: {
		model: 'gpt-3.5-turbo',
		max_tokens: 4096,
		temperature: 1
	},
	variant2: {
		model: 'gpt-4-turbo',
		max_tokens: 4096,
		temperature: 1
	},
	variant3: {
		model: 'gpt-4-vision-preview',
		max_tokens: 4096,
		temperature: 1
	}
};

export const POST = async ({ request }) => {
	const { messages } = await request.json();

	const variant = variants['variant1'];

	const result = await streamText({
		model: openai(variant.model),
		messages,
		max_tokens: variant.max_tokens,
		temperature: variant.temperature
	});

	return result.toDataStreamResponse();
};
