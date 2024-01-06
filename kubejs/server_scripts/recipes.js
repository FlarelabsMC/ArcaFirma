ServerEvents.recipes(event => {
    const { recipes, remove } = event

    Ingredient.of('#arcafirma:staves').itemIds.forEach(staff => {
        event.shapeless(staff,
            ['#arcafirma:foci', staff]
        ).modifyResult((grid, result) => {
            let focus = grid.find(Ingredient.of('#arcafirma:foci'))
            if (focus == null) return result
            result.nbt = { 'arcafirma:focus': focus.id }
            if (Platform.isClientEnvironment()) {
                Client.player.playSound('minecraft:entity.experience_orb.pickup', 1, 1)
            }
            return result
        }).id(`arcafirma:add_focus_${staff.replace(':', '_').replace('/', '_')}`)
        event.shapeless(staff,
            [staff]
        ).modifyResult((grid, result) => {
            let item = grid.find(Item.of(staff))
            if (!item.nbt || Item.of(item.nbt['arcafirma:focus']).isEmpty()) return result
            if (Platform.isClientEnvironment()) {
                Client.player.playSound('minecraft:entity.experience_orb.pickup', 1, 1)
                Client.player.tell(Component.translate('arcafirma.remove_focus'))
            }
            return Item.of(item.nbt['arcafirma:focus'], { 'var1': 1 })
        }).id(`arcafirma:remove_focus_${staff.replace(':', '_').replace('/', '_')}`)
    })
})

ItemEvents.crafted(Ingredient.all, event => {
    if (!event.item.hasTag('arcafirma:foci') && !event.item?.nbt?.var1) return
    if (Platform.isClientEnvironment()) {
        Client.player.playSound('minecraft:item.shield.break', 1, 0.5)
        Client.player.playSound('minecraft:item.totem.use', 1, 1)
    }
})