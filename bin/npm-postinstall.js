process.chdir(__dirname);
console.log('compiling client...');

const path = require("path");
const {exec} = require('child_process');

const projectFolder = path.dirname(__dirname);
const binPath = path.resolve(projectFolder, 'node_modules/.bin');
const webpackPath = path.join(binPath, 'webpack');
const webpackConfigPath = path.join(projectFolder, 'webpack.config.js');

const commandText = `"${webpackPath}" -p --env=production --progress --colors --profile --config "${webpackConfigPath}"`;
console.log(commandText);
const command = exec(commandText);

command.stdout.on('data', function (data) {
    process.stdout.write(data);
});
command.stderr.on('data', function (data) {
    process.stderr.write(data);
});
command.on('error', function (err) {
    process.stderr.write(err);
});