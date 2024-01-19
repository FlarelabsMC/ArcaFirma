ClientEvents.highPriorityAssets(event => {
    global.ArcaFirma.registry.items.salts.forEach(salt => {
        event.add(`arcafirma:models/item/magic/salt/${salt}`, {
            parent: 'item/generated',
            textures: {
                layer0: `arcafirma:item/magic/salt/${salt}`
            }
        })
    })
    global.ArcaFirma.registry.items.sugars.forEach(sugar => {
        event.add(`arcafirma:models/item/magic/sugar/${sugar}`, {
            parent: 'item/generated',
            textures: {
                layer0: `arcafirma:item/magic/sugar/${sugar}`
            }
        })
    })
})