// BlockEvents.modification(event => {
//     event.modify('tfc:fluid/river_water', block => {
//         block.setIsRandomlyTicking(true)
//         block.setRandomTickCallback(cb => {
//             global.TFC.riverRandomTick(cb)
//         })
//     })
// })

// /**
//  * 
//  * @param {Internal.RandomTickCallbackJS} t 
//  */
// global.TFC.riverRandomTick = function (t) {
//     console.log('riverRandomTick')
//     let { random, block, level } = t
//     level.playSound(null, block.pos, 'arcafirma:river', 'blocks')
// }