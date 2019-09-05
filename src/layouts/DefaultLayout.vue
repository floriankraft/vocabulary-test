<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-bar class="q-electron-drag">
        <div>Vokabel Test</div>

        <q-space />

        <q-btn @click="minimize" dense flat icon="minimize" />
        <q-btn @click="maximize" dense flat icon="crop_square" />
        <q-btn @click="close" dense flat icon="close" />
      </q-bar>
    </q-header>

    <q-page-container>
      <router-view />
      <q-badge class="defaultlayout__versionfield fixed-bottom-right" color="primary" transparent>
        v{{appVersion}}
      </q-badge>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      appVersion: ''
    };
  },
  beforeMount() {
    this.appVersion = this.$q.electron.remote.app.getVersion();
  },
  methods: {
    minimize() {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize();
      }
    },
    maximize() {
      if (process.env.MODE === 'electron') {
        const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow();

        if (win.isMaximized()) {
          win.unmaximize();
        } else {
          win.maximize();
        }
      }
    },
    close() {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().close();
      }
    }
  }
};
</script>

<style>
.defaultlayout__versionfield {
  margin: 16px;
}
</style>
