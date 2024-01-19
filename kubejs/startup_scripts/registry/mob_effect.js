StartupEvents.registry('mob_effect', event => {
    event.create('arcafirma:burdened')
        .displayName('Burdened')
        .harmful()
        .modifyAttribute('minecraft:generic.movement_speed', 'arcafirma:burdened_effect_speed', -0.05, 'addition')
        .modifyAttribute('minecraft:generic.max_health', 'arcafirma:burdened_effect_health', -4, 'addition')

    event.create('arcafirma:lights_curse')
        .displayName('The Light\'s Curse')
        .harmful()
        .modifyAttribute('minecraft:generic.max_health', 'arcafirma:lights_curse_effect_health', -8, 'addition')
})