const os = require('os');
const fs = require('fs');
const path = require('path');

function getAppDataPath(appName){
    const platform = os.platform();

    let appDataPath;

    switch(platform){
        case 'win32': //Windows 
            appDataPath = path.join(process.env.APPDATA || '', appName );
            break;
        case 'darwin': //macOS
            appDataPath = path.join(os.homedir(), 'library', 'Application support', appname);
            break;
        case 'linux': //Linux
            appDataPath = path.join(os.homedir(), '.config', appName);
            break;
        default: 
            appDataPath = path.join(os.homedir(), `${appName}`);
    }
    return appDataPath;
}

function getOpenCommand(){
    const platform = os.platform();

    switch(platform){
        case 'win32': //Windows
            return 'start';
        case 'darwin': //linux
            return 'open';
        case 'linux': //Linux
            return 'xdg-open'
    }
}

const appName = 'myApp';
const appDataPath = getAppDataPath(appName);
const openCommand = getOpenCommand();

console.log(`OS platform: ${os.platform()}`);
console.log(`OS type: ${os.type()}`);
console.log(`Recommended app data path: ${appDataPath}`);
console.log(`Open command: ${openCommand}`);

console.log('\nPlatform-specific behaviour:');

if (os.platform() === 'win32') {
  console.log('- Using Windows-specific registry functions');
  console.log('- Setting up Windows service');
} else if (os.platform() === 'darwin') {
  console.log('- Using macOS keychain for secure storage');
  console.log('- Setting up launchd agent');
} else if (os.platform() === 'linux') {
  console.log('- Using Linux systemd for service management');
  console.log('- Setting up dbus integration');
}

const availableMemGB = os.freemem()/ (1024 ** 3);
console.log(`\n Available memory: ${availableMemGB.toFixed(2) } GB`);

if (availableMemGB < 0.5) {
  console.log('Low memory mode activated: reducing cache size and disabling features');
} else if (availableMemGB > 4) {
  console.log('High memory mode activated: increasing cache size and enabling all features');
} else {
  console.log('Standard memory mode activated: using default settings');
}

const cpuCount = os.cpus().length;
console.log(`\nCPU cores: ${cpuCount}`);

const reccommendedWorkers= Math.max(1, cpuCount -1);
console.log(`Recommended worker processes: ${reccommendedWorkers}`);