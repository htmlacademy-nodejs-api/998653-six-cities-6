import 'reflect-metadata';
import { CLIApplication, HelpCommand, VersionCommand, GenerateCommand, ImportCommand } from './cli/index.js';

function bootstrap() {
  const cliApp = new CLIApplication();

  cliApp.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new GenerateCommand(),
    new ImportCommand()
  ]);

  cliApp.prossesCommand(process.argv);
}
bootstrap();
