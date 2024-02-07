let $PauseScreen = Java.loadClass('org.xiaoxian.gui.GuiExitGame$GuiInGameMenuModified')

NetworkEvents.dataReceived('s2c:hurt_event/close_menu', event => {
    const { data } = event
    const { player } = Client

    if (Client.currentScreen != null && !(Client.currentScreen instanceof $PauseScreen)) Client.setScreen(null)
})