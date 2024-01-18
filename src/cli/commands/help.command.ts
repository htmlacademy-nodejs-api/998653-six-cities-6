import { CommnadInterface } from '../commands/command.interface.js';

class HelpCommand implements CommnadInterface {
    public getName(): string {
      return `--help`;
    }

    public async execute(..._params: string[]): Promise<void> {
      console.log (`
      Программа для подготовки данных для REST API сервера.
        Пример:
            cli.js --<command> [--arguments]
        Команды:
            --version:                   # выводит номер версии
            --help:                      # печатает этот текст
            --import <path>:             # импортирует данные из TSV
            --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных
      `)
    }
}
export { HelpCommand }
