#!/usr/bin/env node

const readlineSync = require('readline-sync');
const chalk = require('chalk');
const shell = require('child_process').execSync;

var WineFuncs = {
    sip : function (str) { console.log( chalk.red(`🍇 ${str}`) ); return str },
    shell : function (cmd) { WineFuncs.sip(`Running '${cmd}'`); return shell(cmd); }
};

let tryAgain = false;
do {
    try {
        var Wine = require('grapejuice').Wine;
        tryAgain = false;
    } catch (e) {
        WineFuncs.sip(`It appears that you don't have the main Wine dependency installed.`);
        if (readlineSync.keyInYN(`Would you like to install it?`)) {
            try {
                WineFuncs.shell('npm install grapejuice');
                tryAgain = true;
            } catch (e) {
                WineFuncs.sip(`Something went wrong installing the Wine dependency.`);
                WineFuncs.sip(`Please install it manually. 'npm install grapejuice'`);
            }
        } else {
            WineFuncs.sip(`Ok. Wine isn't for everyone.`);
            break;
        }
    }
} while (tryAgain);


if (!!Wine) {
    let wine = new Wine();
    wine.parse(process.argv);
}
