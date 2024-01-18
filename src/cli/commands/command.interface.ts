interface CommnadInterface {
    getName(): string;
    execute(...params: string[]): void
}

export { CommnadInterface }
