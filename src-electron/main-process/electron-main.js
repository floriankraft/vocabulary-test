import { app, BrowserWindow } from 'electron'
import fs from 'fs'
import path from 'path'

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require('path').join(__dirname, 'statics').replace(/\\/g, '\\\\')
}

let mainWindow

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
    mainWindow = null
  });

  await win.loadURL(process.env.APP_URL)

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
    app.quit()
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    mainWindow = createWindow();
  }
});

const sendVocabularyToPage = (err, data) => {
  console.log(data);
  const vocabularyArray = data.split(/\r?\n/);
  var filteredArray = vocabularyArray.filter(function (el) {
    return el != null && el != '';
  });
  mainWindow.webContents.send('vocabularyFileLoaded', filteredArray);
};

const readVocabularyFile = () => {
  const vocabularyFilePath = path.join('.', '/vocabulary.txt');
  console.log(vocabularyFilePath);
  fs.readFile(vocabularyFilePath, 'utf8', sendVocabularyToPage);
};

(async () => {
  await app.whenReady();
  mainWindow = await createWindow();
  readVocabularyFile();
})();
