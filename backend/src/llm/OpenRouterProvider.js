const OpenAI = require("openai");
const LLMProvider = require("./LLMProvider");

class OpenRouterProvider extends LLMProvider {

    constructor() {
        super();

        this.client = new OpenAI({
            apiKey: process.env.OPENROUTER_API_KEY,
            baseURL: "https://openrouter.ai/api/v1"
        });
    }

    async generate(prompt, options = {}) {

        const response = await this.client.chat.completions.create({
            model: options.model || "openrouter/free",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

        return response.choices[0].message.content;
    }
}

module.exports = OpenRouterProvider;