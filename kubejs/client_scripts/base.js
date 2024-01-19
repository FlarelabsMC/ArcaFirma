// priority: 9999

const $KeyMapping = Java.loadClass('net.minecraft.client.KeyMapping')

const $SodiumExtraClientMod = Java.loadClass('me.flashyreese.mods.sodiumextra.client.SodiumExtraClientMod')

const $AbstractContainerScreen = Java.loadClass('net.minecraft.client.gui.screens.inventory.AbstractContainerScreen')

// const debugEnabled = global['ArcaFirma']['Config']['debug']['enableLogging']

// if (debugEnabled) global.LOGGER.info('Client loading...')

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max)
}

ClientEvents.tick(event => {
    /**
        Constants
    */
    const { player } = event, { options, currentScreen } = Client

    /* 
        Inspect
    */
    // What's this? What's this? There's something in the air!
    let key = global['keys']['INSPECT']
    let bind = key.key.getValue()
    let down = Client.isKeyDown(bind)
    // The above variables just lets you use the keybind in menus
    if (down && currentScreen != null) {
        if (!(Client.screen instanceof $AbstractContainerScreen)) return
        let item = Client.screen.getSlotUnderMouse().getItem()
        if (
            (item.isEmpty() || item.id == 'minecraft:air')
        ) return
        Client.setScreen(null)
        global['LOGGER'].info(`Sending inspection message for ${item.id}`)
        player.sendData('c2s:chat/send_inspection_message', { uuid: 'cab54941-6550-4cbb-9782-c235242e513b', item: item.id })
    }

    /*
        Misc
    */
    if ($KeyMapping.getAllKeyMappings()['key.sprint'].isDown()) {
        if (Math.abs(event.player.getDeltaMovement().x() + event.player.getDeltaMovement().z()) > 0.001)
            event.player.setSprinting(true)
    } else {
        event.player.setSprinting(false)
    }

    /*
        Force options
    */
    Client.options.autoJump().set(false)
    Client.options.bobView().set(false)
    $SodiumExtraClientMod.options().extraSettings.showCoords = false
})