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

const sendVocabularyToPage = (event, vocabularyFileContent) => {
  const vocabularyArray = vocabularyFileContent.split(/\r?\n/);
  const filteredArray = vocabularyArray.filter(el => el !== null && el !== '');
  const payload = {
    filePath: vocabularyFilePath,
    vocabulary: filteredArray
  };
  event.reply('backendHasLoadedVocabularyFile', payload);
};

const readVocabularyFile = async () => {
  let vocabularyFileContent = '';
  const isVocabularyFileExisting = await exists(vocabularyFilePath);
  if (isVocabularyFileExisting) {
    vocabularyFileContent = await readFile(vocabularyFilePath, 'utf8');
  } else {
    await writeFile(vocabularyFilePath, '', 'utf8');
  }
  return vocabularyFileContent;
};

const sendStatisticsToPage = (event, statisticsFileContent) => {
  event.reply('backendHasLoadedStatisticsFile', statisticsFileContent);
};

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
    const data = await readFile(statisticsFilePath, 'utf8');
    statisticsFileContent = JSON.parse(data);
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

ipcMain.on('frontendIsReadyForData', async (event) => {
  const vocabularyFileContent = await readVocabularyFile();
  const statisticsFileContent = await readStatisticsFile();
  sendVocabularyToPage(event, vocabularyFileContent);
  sendStatisticsToPage(event, statisticsFileContent);
});

(async () => {
  await app.whenReady();
  mainWindow = await createWindow();
})();
