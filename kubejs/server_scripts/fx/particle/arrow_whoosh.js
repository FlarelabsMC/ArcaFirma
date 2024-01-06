LevelEvents.tick('minecraft:overworld', event => {
    //Whoosh
    event.level.getEntities().forEach(entity => {
        if (entity.type != 'minecraft:arrow') return
        let movementFactor = Math.abs(clamp(Math.abs(entity.motionX), 0.01, 2) + clamp(Math.abs(entity.motionY), 0.5, 1) + clamp(Math.abs(entity.motionZ), 0.01, 2))
        let pitch = clamp(movementFactor / 2, 0.5, 1.5)
        if (pitch < 1.2 || entity.nbt['inGround']) return
        entity.playSound('arcafirma:arrow_wind', 0.1, pitch)
    })
})