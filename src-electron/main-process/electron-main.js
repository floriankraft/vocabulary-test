import { app, BrowserWindow, ipcMain } from 'electron';
import util from 'util';
import fs from 'fs';
import path from 'path';

// Promisify some needed functions
const exists = util.promisify(fs.exists);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const userDataPath = app.getPath('userData');
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
  /**
   * Initial window options
   */
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

const writeStatisticsFile = (statistics, newStatisticsItem, callback) => {
  statistics.runs.unshift(newStatisticsItem);
  fs.writeFile(statisticsFilePath, JSON.stringify(statistics), 'utf8', () => {
    callback();
  });
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

ipcMain.on('statisticsPrepared', (event, newStatisticsItem) => {
  readStatisticsFile((statistics) => {
    writeStatisticsFile(statistics, newStatisticsItem, () => {
      event.reply('statisticsSaved', statistics);
    });
  });
});

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
  allFilesContent.vocabularyFileContent = await readVocabularyFile();
  allFilesContent.statisticsFileContent = await readStatisticsFile();
  return allFilesContent;
};

ipcMain.on('frontendIsReadyForData', async (event) => {
  const allFilesContent = await readAllFiles();
  event.reply('backendHasLoadedData', allFilesContent);
});

(async () => {
  await app.whenReady();
  mainWindow = await createWindow();
})();
