const TickingItem = Java.loadClass('com.squoshi.packdev.arcafirma.jsaccess.TickingItem')
const $Item$Properties = Java.loadClass('net.minecraft.world.item.Item$Properties')

global.ArcaFirma.registry.items.ALL = []

StartupEvents.registry('item', event => {
    global['ArcaFirma']['registry']['items']['foci'].forEach(name => {
        global['ArcaFirma']['registry']['items']['ALL'].push(
            event.create(`arcafirma:magic/focus/${name}`).unstackable().tag('arcafirma:foci')
        )
    })
    global['ArcaFirma']['registry']['items']['salts'].forEach(name => {
        global['ArcaFirma']['registry']['items']['ALL'].push(
            event.createCustom(`arcafirma:magic/salt/${name}`, () => {
                return new TickingItem(new $Item$Properties().stacksTo(1), (
                    /** @type {Internal.ItemStack} */ item,
                    /** @type {Internal.Level} */ level, 
                    /** @type {Internal.LivingEntity} */ entity, 
                    /** @type {Internal.Slot} */ slot, 
                    /** @type {boolean} */ selected
                ) => {
                    if (level.time % 20 == 0) {
                        if (entity.persistentData['path'] != 'shade') {
                            entity.potionEffects.add('arcafirma:burdened', 21, 0)
                        }
                    }
                })
            })
        )
    })
    global['ArcaFirma']['registry']['items']['sugars'].forEach(name => {
        global['ArcaFirma']['registry']['items']['ALL'].push(
            event.createCustom(`arcafirma:magic/sugar/${name}`, () => {
                return new TickingItem(new $Item$Properties().stacksTo(1), (
                    /** @type {Internal.ItemStack} */ item,
                    /** @type {Internal.Level} */ level, 
                    /** @type {Internal.LivingEntity} */ entity, 
                    /** @type {Internal.Slot} */ slot, 
                    /** @type {boolean} */ selected
                ) => {
                    if (level.time % 20 == 0) {
                        if (entity.persistentData['path'] != 'light') {
                            entity.potionEffects.add('arcafirma:lights_curse', 21, 0)
                        }
                    }
                })
            })
        )
    })



    global['ArcaFirma']['registry']['items']['ALL'].push(
        event.create('arcafirma:animal_product/tallow').tag('arcafirma:valid_candle_ingredients')
    )

    global['TFC']['logs'].forEach(log => {
        let wood = log.split('/')[2]
        global['ArcaFirma']['registry']['items']['ALL'].push(
            event.create(`arcafirma:magic/staff/${wood}`).unstackable().tag('arcafirma:staves')
        )
    })
})