/* 
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Hello sir how are you today? I am very happy to see you here\n\nThat's great to hear! How can I help you?",
  temperature: 0,
  max_tokens: 60,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});
*/

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {

    //get prompt from body
    const prompt = req.body?.prompt


	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt,
		temperature: 0,
		max_tokens: 60,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
	})

	res.status(200).send({
		bot:
			response?.data?.choices?.[0]?.text ||
			'Opps, something went wrong. Try reloading the page',
	})
}
