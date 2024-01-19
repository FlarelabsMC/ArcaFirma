// priority: 0

const $FXHelper = Java.loadClass('com.lowdragmc.photon.client.fx.FXHelper')
const $EntityEffect = Java.loadClass('com.lowdragmc.photon.client.fx.EntityEffect')

ClientEvents.tick(event => {
    Client.level.getEntities().forEach(entity => {
        if (entity.type != 'minecraft:arrow') return
        // to any future developers here: resource locations in methods like these /can/ be a string
        let fx = $FXHelper.getFX('arcafirma:arrow_trail')
        new $EntityEffect(fx, Client.level, entity).start()
    })
})