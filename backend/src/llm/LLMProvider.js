class LLMProvider {
    async generate(prompt, options = {}) {
        throw new Error(
            "generate() must be implemented by an LLM provider"
        );
    }
}

module.exports = LLMProvider;