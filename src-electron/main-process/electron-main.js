import { app, BrowserWindow, ipcMain } from 'electron';
import util from 'util';
import fs from 'fs';
import path from 'path';

// Promisify some needed functions
const exists = util.promisify(fs.exists);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const userDataPath = app.getPath('userData');
const settingsFilePath = path.join(userDataPath, '/0f83ae01-0ec7-4983-95f1-6b0c15c0ecfe');
const vocabularyFilePath = path.join(userDataPath, '/vocabulary.txt');
const statisticsFilePath = path.join(userDataPath, '/statistics.json');

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

const writeStatisticsFile = async (statisticsFileContent, newStatisticsItem) => {
  statisticsFileContent.runs.unshift(newStatisticsItem);
  await writeFile(statisticsFilePath, JSON.stringify(statisticsFileContent), 'utf8');
  return statisticsFileContent;
};

const readStatisticsFile = async () => {
  let statisticsFileContent = {
    runs: []
  };
  const isStatisticsFileExisting = await exists(statisticsFilePath);
  if (isStatisticsFileExisting) {
    const fileData = await readFile(statisticsFilePath, 'utf8');
    statisticsFileContent = JSON.parse(fileData);
  } else {
    await writeFile(statisticsFilePath, JSON.stringify(statisticsFileContent), 'utf8');
  }
  return statisticsFileContent;
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

const readSettingsFile = async () => {
  let settingsFileContent = {
    pw: ''
  };
  const isSettingsFileExisting = await exists(settingsFilePath);
  if (isSettingsFileExisting) {
    const fileData = await readFile(settingsFilePath, 'utf8');
    settingsFileContent = JSON.parse(fileData);
  } else {
    await writeFile(settingsFilePath, JSON.stringify(settingsFileContent), 'utf8');
  }
};

const readAllFiles = async () => {
  const allFilesContent = {};
  allFilesContent.settingsFileContent = await readSettingsFile();
  allFilesContent.vocabularyFileContent = await readVocabularyFile();
  allFilesContent.statisticsFileContent = await readStatisticsFile();
  return allFilesContent;
};

// Event listeners

ipcMain.on('frontendHasNewStatisticsItem', async (event, newStatisticsItem) => {
  const statisticsFileContent = await readStatisticsFile();
  const newStatisticsFileContent = await writeStatisticsFile(statisticsFileContent, newStatisticsItem);
  event.reply('backendHasSavedStatistics', newStatisticsFileContent);
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
