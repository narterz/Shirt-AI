import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

export const CallChaotGptAPI =async (message: any) => {
    const [messageResponse, setMessageResponse] = useState<any>('');

    try {

        const configuration = new Configuration({
            apiKey: process.env.REACT_APP_CHATGPT_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        const Response = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: message,
            temperature: 0.7,
            max_tokens: 6,
            n: 1,
            stop: '\n',
        });
        setMessageResponse(Response.data.choices[0].text)
    } catch (error){
        console.log(error)
    }

    return messageResponse;
}