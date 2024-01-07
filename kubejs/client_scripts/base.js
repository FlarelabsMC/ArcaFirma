// priority: 9999

if (debugEnabled) global.LOGGER.info('Client loading...')

const $FXHelper = Java.loadClass('com.lowdragmc.photon.client.fx.FXHelper')
const $EntityEffect = Java.loadClass('com.lowdragmc.photon.client.fx.EntityEffect')

const $KeyMapping = Java.loadClass('net.minecraft.client.KeyMapping')

const $SodiumExtraClientMod = Java.loadClass('me.flashyreese.mods.sodiumextra.client.SodiumExtraClientMod')

const debugEnabled = global['ArcaFirma']['Config']['debug']['enableLogging']

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
    if (global['keys']['INSPECT'].consumeClick()) {
        if (currentScreen != null) return
        let item = player.getMainHandItem(), itemId = item.getId()
        if (// ignore if the player is in a menu, or if the player is holding nothing
            currentScreen != null ||
            (item.isEmpty() || itemId == 'minecraft:air')
        ) return
        if (debugEnabled) global['LOGGER'].info(`Sending inspection message for ${itemId}`)
        player.sendData('c2s:chat/send_inspection_message', { uuid: 'cab54941-6550-4cbb-9782-c235242e513b', item: itemId })
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