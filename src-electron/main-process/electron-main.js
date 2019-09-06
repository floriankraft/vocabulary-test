import { app, BrowserWindow, ipcMain } from 'electron';
import util from 'util';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Promisify some needed functions
const exists = util.promisify(fs.exists);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const userDataPath = app.getPath('userData');

const settingsFilePath = path.join(userDataPath, '/settings.json');
const settingsFileDefaultContent = {
  pw: {
    hash: '',
    salt: ''
  }
};

const vocabularyFilePath = path.join(userDataPath, '/vocabulary.txt');

const statisticsFilePath = path.join(userDataPath, '/statistics.json');
const statisticsFileDefaultContent = {
  runs: []
};

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = path.join(__dirname, 'statics').replace(/\\/g, '\\\\');
}

let mainWindow;

const createWindow = async () => {
  const win = new BrowserWindow({
    frame: false,
    height: 600,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true
    },
    width: 1000
  });

  win.on('ready-to-show', () => {
    win.show();
  });

  win.on('closed', () => {
    mainWindow = null;
  });

  await win.loadURL(process.env.APP_URL);

  return win;
};

// Prevent multiple instances of the app
if (!app.requestSingleInstanceLock()) {
  app.quit();
}

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.show();
  }
});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    mainWindow = createWindow();
  }
});

// Read/Write file operations

/**
 * Reads a JSON file and returns a JSON object accordingly.
 *
 * @param {String} filePath Path to the JSON file, that should be read.
 * @param {Object} defaultContent JSON object, that should be set initially, if the file is empty.
 */
const readJsonFile = async (filePath, defaultContent) => {
  let jsonFileContent = defaultContent;
  const isJsonFileExisting = await exists(filePath);
  if (isJsonFileExisting) {
    const fileData = await readFile(filePath, 'utf8');
    jsonFileContent = JSON.parse(fileData);
  } else {
    await writeFile(filePath, JSON.stringify(jsonFileContent), 'utf8');
  }
  return jsonFileContent;
};

const writeStatisticsFile = async (newStatisticsItem) => {
  const statisticsFileContent = await readJsonFile(statisticsFilePath, statisticsFileDefaultContent);
  statisticsFileContent.runs.unshift(newStatisticsItem);
  await writeFile(statisticsFilePath, JSON.stringify(statisticsFileContent), 'utf8');
  return statisticsFileContent;
};

const writePasswordToSettingsFile = async (data) => {
  const settingsFileContent = await readJsonFile(settingsFilePath, settingsFileDefaultContent);

  settingsFileContent.pw.salt = crypto.randomBytes(16).toString('hex');
  settingsFileContent.pw.hash = crypto.pbkdf2Sync(
    data.password, settingsFileContent.pw.salt, 1000, 64, 'sha512'
  ).toString('hex');

  await writeFile(settingsFilePath, JSON.stringify(settingsFileContent), 'utf8');
};

const prepareSettingsFileForFrontend = (settingsFileContent) => {
  settingsFileContent.isPasswordExisting = settingsFileContent.pw.hash !== '' && settingsFileContent.pw.salt !== '';
  delete settingsFileContent.pw;
  return settingsFileContent;
};

const readVocabularyFile = async () => {
  const vocabularyFileContent = {
    filePath: vocabularyFilePath,
    vocabulary: []
  };
  const isVocabularyFileExisting = await exists(vocabularyFilePath);
  if (isVocabularyFileExisting) {
    const fileData = await readFile(vocabularyFilePath, 'utf8');
    const vocabularyArray = fileData.split(/\r?\n/);
    const filteredArray = vocabularyArray.filter(el => el !== null && el !== '');
    vocabularyFileContent.vocabulary = filteredArray;
  } else {
    await writeFile(vocabularyFilePath, '', 'utf8');
  }
  return vocabularyFileContent;
};

const readAllFiles = async () => {
  const allFilesContent = {};
  const settingsFileContent = await readJsonFile(settingsFilePath, settingsFileDefaultContent);
  allFilesContent.settingsFileContent = prepareSettingsFileForFrontend(settingsFileContent);
  allFilesContent.vocabularyFileContent = await readVocabularyFile();
  allFilesContent.statisticsFileContent = await readJsonFile(statisticsFilePath, statisticsFileDefaultContent);
  return allFilesContent;
};

// Event listeners

ipcMain.on('frontendHasNewStatisticsItem', async (event, newStatisticsItem) => {
  const newStatisticsFileContent = await writeStatisticsFile(newStatisticsItem);
  event.reply('backendHasSavedStatistics', newStatisticsFileContent);
});

ipcMain.on('frontendHasNewPassword', async (event, newPassword) => {
  await writePasswordToSettingsFile(newPassword);
  event.reply('backendHasSavedPassword');
});

ipcMain.on('frontendIsReadyForData', async (event) => {
  const allFilesContent = await readAllFiles();
  event.reply('backendHasLoadedData', allFilesContent);
});

// Starting point

(async () => {
  await app.whenReady();
  mainWindow = await createWindow();
})();
