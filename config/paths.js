const fs = require('fs');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appBuild: resolvePath(process.env.BUILD_PATH || './build'),
  appHtml: resolvePath('./public/index.html'),
  appIndex: resolvePath('./src/index.tsx'),
  appLib: resolvePath('./lib'),
  appPackageJson: resolvePath('package.json'),
  appPath: resolvePath('.'),
  appPublic: resolvePath('./public'),
  appSrc: resolvePath('./src'),
  dotenv: resolvePath('.env')
};
