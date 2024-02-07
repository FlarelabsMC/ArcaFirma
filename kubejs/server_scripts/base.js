// priority: 10000

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max)
}

function setAttribute(entity, attribute, value) {
    if (entity.attributes.getBaseValue(attribute) != value) {
        entity.attributes.getInstance(attribute).setBaseValue(value)
    }
}

// -------------------------------------------------------------------------------------------------------------------------------

ServerEvents.loaded(event => {
    if (Utils.server.isSingleplayer()) {
        // If you ever see this in your logs, HAHA you're lonely
        // ...well, not that I'm one to talk
        global.LOGGER.info('Loading integrated server...')
    } else {
        global.LOGGER.info('Loading dedicated server...')
    }
})

// --- Misc ----------------------------------------------------------------------------------------------------------------------

TFCEvents.log(event => {
    // Fallback for if Panda's Falling Trees doesn't work
    event.cancel()
})

LevelEvents.tick('minecraft:overworld', event => {
    const { level } = event
    level.getEntities().forEach(/** @type {Internal.Entity} */ entity => {
        if (entity.type == 'minecraft:skeleton') {
            entity.setRemainingFireTicks(0)
        }
        if (entity.type == 'minecraft:zombie') {
            setAttribute(entity, 'generic.movement_speed', 0.4)
        }
    })
})

EntityEvents.spawned('minecraft:zombie', event => {
    let /** @type {Internal.Zombie} */ entity = event.entity
    entity.isBaby() ? entity.setMaxHealth(1) 
    && entity.setHealth(0.5)
    && setAttribute(entity, 'generic.armor', 0)
    : 
    entity.setMaxHealth(60) && entity.setHealth(60)
})

EntityEvents.hurt(event => {
    const { entity } = event
    if ((event.source.type().msgId() == 'inFire' || event.source.type().msgId() == 'onFire') && entity.type == 'minecraft:skeleton') {
        entity.setRemainingFireTicks(0)
        event.cancel()
    }
    if ((event.source.type().msgId() == 'inFire' || event.source.type().msgId() == 'onFire') && entity.type == 'minecraft:zombie') {
        entity.attack(10)
    }
    if (event.entity.isPlayer()) {
        event.entity.sendData('s2c:hurt_event/close_menu', {})
    }
})

PlayerEvents.tick(event => {
    const { player } = event
    if (player.persistentData.inspectCooldown == undefined || player.persistentData.inspectCooldown == null) {
        player.persistentData.inspectCooldown = 0
    } else {
        if (player.persistentData.inspectCooldown > 0) {
            player.persistentData.inspectCooldown--
        }
    }
    setAttribute(player, 'forge:step_height_addition', 0.5)
})

PlayerEvents.loggedIn(event => {
    const { player } = event
    if (!player.persistentData.firstjoin) {
        for (let i = 1; i < 61; i++) {
            Utils.server.scheduleInTicks(i, () => {
                player.inventory.getAllItems().forEach(item => {
                    item.setCount(0)
                })
                if (i == 10) {
                    player.give(Item.of('arcafirma:gift_of_the_gods'))
                }
            })
        }
        player.persistentData.firstjoin = true
    }
})