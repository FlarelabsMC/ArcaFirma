Platform.mods.kubejs.name = 'ArcaFirma'

StartupEvents.modifyCreativeTab('kubejs:tab', tab => {
    tab.setDisplayName('ArcaFirma: All Items')
})

StartupEvents.registry('creative_mode_tab', event => {
    event.create('arcafirma:salts_sugars').content(() => [
        'arcafirma:magic/salt/amethyst',
        'arcafirma:magic/salt/diamond',
        'arcafirma:magic/salt/emerald',
        'arcafirma:magic/salt/ruby',
        'arcafirma:magic/salt/sapphire',
        'arcafirma:magic/salt/topaz',
        'arcafirma:magic/salt/opal',
        'arcafirma:magic/salt/lapis',
        'arcafirma:magic/salt/pyrite',

        'arcafirma:magic/sugar/amethyst',
        'arcafirma:magic/sugar/diamond',
        'arcafirma:magic/sugar/emerald',
        'arcafirma:magic/sugar/ruby',
        'arcafirma:magic/sugar/sapphire',
        'arcafirma:magic/sugar/topaz',
        'arcafirma:magic/sugar/opal',
        'arcafirma:magic/sugar/lapis',
        'arcafirma:magic/sugar/pyrite'
    ]).displayName('ArcaFirma: Salts and Sugars')
})

// StartupEvents.init(event => {
//     let SHADERLOCK = JsonIO.read('shaderpacks/ComplementaryReimagined_r5.1.1 + EuphoriaPatches_1.1/ARFM_LOCK.json')
//     if (!SHADERLOCK) console.error('The shaders are not to be removed by the user. If you are removing these shaders to help with performance, please try changing the settings in the options menu.')
// })

ClientEvents.init(event => {
    let $KeyMappingRegistry = Java.loadClass('dev.architectury.registry.client.keymappings.KeyMappingRegistry')
    let $KeyMapping = Java.loadClass('net.minecraft.client.KeyMapping')
    let $ToggleKeyMapping = Java.loadClass('net.minecraft.client.ToggleKeyMapping')
    let $GLFWKey = Java.loadClass('org.lwjgl.glfw.GLFW')
    let $OnlineUtils = Java.loadClass('com.squoshi.packdev.arcafirma.utils.OnlineUtils')
    let $FileUtils = Java.loadClass('com.squoshi.packdev.arcafirma.utils.FileUtils')

    global['keys'] = {}

    global['keys']['INSPECT'] = new $KeyMapping('key.arcafirma.inspect', $GLFWKey.GLFW_KEY_I, 'key.categories.gameplay')
    global['keys']['ZOOM'] = new $ToggleKeyMapping('key.arcafirma.zoom', $GLFWKey.GLFW_KEY_Q, 'key.categories.gameplay', () => true)

    Object.keys(global['keys']).forEach(key => {
        $KeyMappingRegistry.register(global.keys[key])
    })

    if ($OnlineUtils.checkOnlineStatus()) {
        global.LOGGER.info('Internet connected! ArcaFirma can initialize online features.')
        global.isOnline = true
    } else {
        global.LOGGER.info('Internet not connected! ArcaFirma cannot initialize online features.')
        global.isOnline = false
    }

    JsonIO.write('online_status.json', { isOnline: global.isOnline })
})