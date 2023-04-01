import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const { apiKey } = req.body

		const configuration = new Configuration({
			apiKey: apiKey,
		})
		const openai = new OpenAIApi(configuration)

		const prompt = req.body?.prompt

		const response = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt,
			temperature: 0.9,
			max_tokens: 150,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0.6,
			stop: [' Human:', ' AI:'],
		})

		return res
			.status(200)
			.send(
				response?.data?.choices?.[0]?.text ||
					'Opps, something went wrong'
			)
	} catch (error:any) {
		// check if error is 401
		if (error?.response?.status === 401) {
			return res.status(401).send('Invalid API Key')
		}
		return res
			.status(500)
			.send('Opps, something went wrong')
	}
}
