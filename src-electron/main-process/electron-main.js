import { app, BrowserWindow, ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';

const vocabularyFilePath = path.join('.', '/vocabulary.txt');
const statisticsFilePath = path.join('.', '/statistics.json');

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
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true
    }
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
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    mainWindow = createWindow();
  }
});

const sendVocabularyToPage = (err, data) => {
  const vocabularyArray = data.split(/\r?\n/);
  const filteredArray = vocabularyArray.filter(el => el !== null && el !== '');
  mainWindow.webContents.send('vocabularyFileLoaded', filteredArray);
};

const readVocabularyFile = (callback) => {
  fs.readFile(vocabularyFilePath, 'utf8', callback);
};

const sendStatisticsToPage = (data) => {
  mainWindow.webContents.send('statisticsFileLoaded', data);
};

const writeStatisticsFile = (statistics, newStatisticsItem, callback) => {
  statistics.runs.unshift(newStatisticsItem);
  fs.writeFile(statisticsFilePath, JSON.stringify(statistics), 'utf8', () => {
    callback();
  });
};

const readStatisticsFile = (callback) => {
  fs.exists(statisticsFilePath, (exists) => {
    if (exists) {
      fs.readFile(statisticsFilePath, (err, statisticsFileContent) => {
        if (!err) {
          callback(JSON.parse(statisticsFileContent));
        }
      });
    } else {
      const emptyStatistics = {
        runs: []
      };
      callback(emptyStatistics);
    }
  });
};

ipcMain.on('statisticsPrepared', (event, newStatisticsItem) => {
  readStatisticsFile((statistics) => {
    writeStatisticsFile(statistics, newStatisticsItem, () => {
      event.reply('statisticsSaved', statistics);
    });
  });
});

(async () => {
  await app.whenReady();
  mainWindow = await createWindow();
  readVocabularyFile(sendVocabularyToPage);
  readStatisticsFile(sendStatisticsToPage);
})();
