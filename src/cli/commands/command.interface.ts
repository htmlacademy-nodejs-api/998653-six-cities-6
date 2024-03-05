interface CommandInterface {
    getName(): string;
    execute(...params: string[]): void
}

export { CommandInterface as CommandInterface };
