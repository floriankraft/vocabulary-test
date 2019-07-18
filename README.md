# Readme

This is a simple application for practicing the spelling of vocabulary. The user interface is in german language, but
as most elements are iconographic, this should be not an issue for speakers of other languages.

![Image of the evaluation page for a single word.](vocabulary-test.jpg "Vocabulary Test Evaluation Page")

The vocabulary for a training session is defined in a file `vocabulary.txt` in the user configuration directory. If it
is yet empty, you will be notified on startup. A button is provided as a shortcut to open that file.

To change the vocabulary for training, the application has to be closed and reopened, as the words are stored in memory
at the beginning of the session.

## Production build

`npm run build`

## Development build & Run

* `npm install`
* `npm start`

## Path of vocabulary file per OS

* Linux: `~/.config/Electron/Vocabulary Test/vocabulary.txt`
* Mac: (?)
* Windows: (?)
