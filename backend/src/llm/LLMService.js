const OpenRouterProvider = require("./OpenRouterProvider");

class LLMService {

    constructor() {
        this.provider = new OpenRouterProvider();
    }

    async generate(prompt, options = {}) {
        return await this.provider.generate(
            prompt,
            options
        );
    }
}

module.exports = LLMService;