import esbuild from 'esbuild';
import config from './esbuild.config';

try {
  const context = await esbuild.context(config);
  await context.watch();
  0;
} catch (e) {
  process.exit(1);
}
