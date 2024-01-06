LevelEvents.tick(event => {
    event.level.getEntities().forEach(entity => {
        if (entity.type != 'minecraft:marker' || !entity.persistentData.isSoundByte) return
        let storedSound = entity.persistentData.storedSound
        if (storedSound == undefined || storedSound == null) {
            storedSound = 'minecraft:ambient.cave|1|1'
        } else {
            let sound = storedSound.split('|')
            entity.playSound(sound[0], sound[1], sound[2])
        }
        if (entity.persistentData.timeLeft == undefined || entity.persistentData.timeLeft == null) {
            entity.persistentData.timeLeft = 0
        } else {
            if (entity.persistentData.timeLeft > 0) {
                entity.persistentData.timeLeft--
            }
        }
        if (entity.persistentData.timeLeft == 0) {
            entity.remove('discarded')
        }
    })
})