/*
Author : Kingsley Amankwa
COMPANY: NirdTeq,Inc
*/
const {app, BrowserWindow , ipcMain} = require('electron')
const path = require('path')

// this takes care of reload so there's no need to refresh the electron app
require('electron-reload')(__dirname, {
    // Note that the path to electron may vary according to the main file
    electron: require(`${__dirname}/node_modules/electron`)
});

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    minWidth: 250,
    minHeight: 300,
    frame: true,
      show: false,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    },
    enableRemoteModule: true
  })


     // waits for program to load visual before showing
   mainWindow.once('ready-to-show', () =>{
       mainWindow.show();
   })
  // and load the index.html of the app.
  mainWindow.loadFile('./src/index.html')

  // Open the DevTools to debug electron.
   mainWindow.webContents.openDevTools();

}

//disable default window menu globally
app.on('browser-window-created',function(event,window) {
  window.setMenu(null);
})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


//recieves message for  the renderer.js then issues print on the printer connected
//note: I stated EPSON as default printer. But the main idea is to be able to auto-detect the printer connected!
// then feed the name into the printName method
ipcMain.on('print', (event,arg) => {
    const data = JSON.parse(arg);
    console.log(printerName);
   PosPrinter.print(data, {
   preview: true,
   width: '300px',
   margin: '0 0 0 0',
   border: 1,
   copies: 1,
   printerName: 'EPSON',
   timeOutPerLine: 400,
   silent: true
    }).catch(error => console.error(error));
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// You can use console.log(notification); to see more available properties
