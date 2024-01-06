NetworkEvents.dataReceived('c2s:chat/send_inspection_message', event => {
    const { player, player: { x, y, z }, level } = event, { uuid, item } = event.data
    let key = Item.of(item).getDescriptionId()
    if (uuid != 'cab54941-6550-4cbb-9782-c235242e513b') return
    // level.getEntitiesWithin(AABB.of(x - 30, y - 30, z - 30, x + 30, y + 30, z + 30)).forEach(entity => {
    //     if (!entity.isPlayer()) return
    //     if (player.persistentData.inspectCooldown > 0) return
    //     let quote = Component.translate(key + '.inspect')
    //     if (global.ArcaFirma.features.inspect.en_us[item] == undefined) {
    //         quote = Component.translate('arcafirma.inspect.default_' + Math.floor(Math.random() * 3 + 1))
    //     }
    //     player.persistentData.inspectCooldown = 20
    //     entity.tell(Component.of(`§7<§r${player.username} inspected `).append(Component.translate(key)).append('§r§7>§r ').append(quote))
    // })
    if (player.persistentData.inspectCooldown > 0) return
    let quote = Component.translate(key + '.inspect')
    if (global.ArcaFirma.features.inspect.en_us[item] == undefined) {
        quote = Component.translate('arcafirma.inspect.default_' + Math.floor(Math.random() * 3 + 1))
    }
    player.persistentData.inspectCooldown = 20
    player.displayClientMessage(quote, true)
})