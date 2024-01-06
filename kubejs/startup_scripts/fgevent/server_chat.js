// ForgeEvents.onEvent('net.minecraftforge.event.ServerChatEvent', event => {
//     global.ServerChatEvent(event)
// })

// global.ServerChatEvent = function (/** @type {Internal.ServerChatEvent} */ event) {
//     const message = event.message
//     const player = event.player
//     event.setCanceled(true)
//     event.player.tell(Component.of(`[You, §eOutgoing§r] `).append(message))
//     event.player.getLevel().getEntities().forEach(entity => {
//         if (!entity.isPlayer() || entity === player) return
//         const distance = Math.floor(entity.distanceToEntity(player))
//         if (distance > 30) return
//         entity.tell(Component.of(`[${event.player.username}, §e${distance}m§r] `).append(message))
//     })
// }