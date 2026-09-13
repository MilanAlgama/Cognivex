class Agent {
  constructor({
    id,
    name,
    role,
    description,
    capabilities = [],
    systemPrompt = "",
  }) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.description = description;
    this.capabilities = capabilities;
    this.systemPrompt = systemPrompt;
  }

  async execute(task) {
    throw new Error(`execute() is not implemented for agent: ${this.name}`);
  }
}

module.exports = Agent;
