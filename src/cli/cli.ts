import * as os from 'os';
import { Command, Option } from 'commander';
import { KalenderEvents } from '../lib';
import { default as globby } from 'globby';
import { promises as fsPromises } from 'fs';
import * as fs from 'fs';
import { Config } from '../';
import { CliOptions } from './cliOptions';
const program = new Command();

async function status(cli1: CliOptions, cli2: Command | Config, cli3: Command) {

  let options: CliOptions = cli1;
  //let command: Command = cli2 as Command;

  if (cli3 !== undefined) {
    options = cli2 as Config;
    options.argument = cli1;
    //command = cli3;
  }

  if (options.url === undefined) {
    options = Object.assign(options, program.opts());
  }

  if (!Object.prototype.hasOwnProperty.call(options, 'auth') && !Object.prototype.hasOwnProperty.call(options, 'url')) {
    const paths = await globby(['**/.kalender-events.json']);
    const homedir = os.homedir();
    if (fs.existsSync(`${homedir}/.kalender-events.json`)) {
      paths.push(`${homedir}/.kalender-events.json`);
    }

    for (const path of paths) {
      const data = JSON.parse((await fsPromises.readFile(path)).toString());
      options = Object.assign(options, data);
    }
  }

  let ke = new KalenderEvents()
  const ret: any = await ke.getEvents(options);
  console.log(ret);
}

export async function execute(rawArgs: string[]) {
  try {

    const urlOption = new Option('-u, --url [url]', 'URL to Calendar');
    const typeOption = new Option('-t, --type [type]', 'Type can be ical, icloud or caldav');
    const pastviewOption = new Option('--pastview [pastview]', 'Type can be ical, icloud or caldav');
    const pastviewUnitsOption = new Option('--pastview-unit [pastview-unit]', 'Type can be ical, icloud or caldav');
    const previewOption = new Option('--preview [preview]', 'Type can be ical, icloud or caldav');
    const previewUnitsOption = new Option('--preview-unit [preview-unit]', 'Type can be ical, icloud or caldav');
    const filterOption = new Option('--filter [filter]', 'Type can be ical, icloud or caldav');
    const filterPropertyOption = new Option('--filter-property [filterProperty]', 'Type can be ical, icloud or caldav');
    const triggerOption = new Option('--trigger [trigger]', 'Type can be ical, icloud or caldav');
    const nowOption = new Option('--now [now]', 'Type can be ical, icloud or caldav');

    program.addOption(urlOption);
    program.addOption(typeOption);
    program.addOption(pastviewOption);
    program.addOption(pastviewUnitsOption);
    program.addOption(previewOption);
    program.addOption(previewUnitsOption);
    program.addOption(filterOption);
    program.addOption(filterPropertyOption);
    program.addOption(triggerOption);
    program.addOption(nowOption);

    program
      .command('upcoming')
      .description('A list of events')
      .action(status);

    program
      .command('trigger')
      .description('Trigger a output on event start and event end')
      .action(status);

    program
      .command('sensors')
      .description('Check if a event is running currently')
      .action(status);

    await program.parseAsync(rawArgs);
    if (process.argv.length < 3) {
      program.help();
    }

  } catch (error) {
    console.error(error);
  }

}
