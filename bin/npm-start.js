process.chdir(__dirname);
console.log('stating script executed!');

const path = require("path");
const {exec} = require('child_process');

const projectFolder = path.dirname(__dirname);
const binPath = path.resolve(projectFolder, 'node_modules/.bin');
const tsNodePath = path.join(binPath, 'ts-node');
const indexPath = path.resolve(projectFolder, 'index.ts');
const tsconfigOfNodePath = path.resolve(projectFolder, 'tsconfig-node.json');

const commandText = `"${tsNodePath}" --project "${tsconfigOfNodePath}" ${indexPath}`;
console.log(commandText);
const command = exec(commandText);

command.stdout.on('data', function(data) {
    process.stdout.write(data);
});
command.stderr.on('data', function(data) {
    process.stderr.write(data);
});
command.on('error', function(err) {
    process.stderr.write(err);
});