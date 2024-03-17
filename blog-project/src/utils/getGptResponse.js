import OpenAI from "openai";
import config from "../config/config";

const openai = new OpenAI({
    apiKey:config.openAiKey,
    dangerouslyAllowBrowser:true
})

async function getGptResponse(query){
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: query }],
        model: 'gpt-3.5-turbo',
      })
      return completion.choices[0].message.content
}

export default getGptResponse