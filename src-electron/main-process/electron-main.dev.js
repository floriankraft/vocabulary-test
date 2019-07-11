/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */
import { app } from 'electron';
import path from 'path';
import electronDebug from 'electron-debug';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import { productName } from '../../package.json';

// Set user data path explicitly in DEV mode. Otherwise it would always be 'Electron'.
const originalUserData = app.getPath('userData');
app.setPath('userData', path.join(originalUserData, productName));

// Show dev-tools
electronDebug({ showDevTools: true, devToolsMode: 'undocked' });

// Install `vue-devtools`
app.on('ready', () => {
  installExtension(VUEJS_DEVTOOLS)
    .then(() => {})
    .catch((err) => {
      console.log('Unable to install `vue-devtools`: \n', err);
    });
});

// Require `main` process to boot app
require('./electron-main');
