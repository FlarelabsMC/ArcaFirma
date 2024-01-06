ClientEvents.highPriorityAssets(event => {
    global['TFC']['logs'].forEach(log => {
        let wood = log.split('/')[2]
        event.add(`arcafirma:models/item/magic/staff/${wood}`, {
            parent: 'item/generated',
            textures: {
                layer0: `arcafirma:item/magic/staff/${wood}`
            },
            display: {
                thirdperson_righthand: {
                    rotation: [90, -90, 134],
                    translation: [0, 1.75, 1.5],
                    scale: [0.8, 0.8, 0.8]
                },
                thirdperson_lefthand: {
                    rotation: [90, 90, -134],
                    translation: [0, 1.75, 1.5],
                    scale: [0.8, 0.8, 0.8]
                }
            }
        })
    })
})