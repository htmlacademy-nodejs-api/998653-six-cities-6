import { CLIApplication, HelpCommand, VersionCommand, GenerateCommand } from './cli/index.js';

function bootstrap() {
  const cliApp = new CLIApplication();

  cliApp.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new GenerateCommand()
  ]);

  cliApp.prossesCommand(process.argv);
}
bootstrap();
