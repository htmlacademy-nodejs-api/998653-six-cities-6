import { CLIApplication, HelpCommand, VersionCommand } from './cli/index.js';

function bootstrap() {
  const cliApp = new CLIApplication();

  cliApp.registerCommands([
    new HelpCommand(),
    new VersionCommand()
  ]);

  cliApp.prossesCommand(process.argv);
}
bootstrap();
