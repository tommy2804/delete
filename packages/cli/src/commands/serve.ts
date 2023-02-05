import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-api';

interface errorType {
  code: string;
}

const isProduction = process.env.NODE_ENV === 'production';

export const serverCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(parseInt(options.port), path.basename(filename), dir, !isProduction);
      console.log(
        `opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`
      );
    } catch (err) {
      if ((err as errorType).code === 'EADDRINUSE') {
        console.error('Port is in use. Try running on a different port.');
      } else {
        console.log('Error', (err as Error).message);
      }
      process.exit(1);
    }
  });
