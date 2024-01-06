// KubeJS Test Code Evaluator (KTCE) in KDK (KubeJS Development Kit)
// Unorthodox and unsafe live code evaluator for KubeJS, meant for development purposes only. 
// Use at your own risk!

const evalBlacklist = [
    'while(',
    'while (',
    'for(',
    'for (',
    'reschedule()',
    'JsonIO',
    'eval(',
    'eval (',
    'new Function(',
    'new Function (',
]
PlayerEvents.chat(event => {
    // if (!event.player.hasPermissions(4)) return
    if (!JsonIO.read('devmode.json').enabled) return
    let message = event.message
    let code = event.player.persistentData.evalCode
    if (!event.player.persistentData.evalCode) event.player.persistentData.evalCode = ''
    if (message.startsWith('-EVAL ')) {
        message = message.replace('-EVAL ', '')
        if (!message.endsWith('{')) message += ';'
        event.player.persistentData.evalCode = code + message
        event.player.tell(Text.of(message).green())
        event.cancel()
    } else if (message.startsWith('-EVALR')) {
        event.player.tell('§eRunning eval code...')
        Utils.server.scheduleInTicks(10, () => {
            if (event.player.persistentData.evalCode == '') {
                event.player.tell('§cNo eval code to run!§r')
                return event.cancel()
            }
            if (evalBlacklist.some(keyword => event.player.persistentData.evalCode.includes(keyword))) {
                event.player.tell('§cYour eval code contains blacklisted keyword(s)!§r')
                return event.cancel()
            }
            try {
                new Function(event.player.persistentData.evalCode)()
                event.player.tell('§aEval code ran successfully!§r')
                event.server.runCommandSilent(`kubejs reload server_scripts`)
            } catch (error) {
                event.player.tell(Text.of(`§c${error}`))
            }
        })
        event.cancel()
    } else if (message.startsWith('-EVALC')) {
        event.player.persistentData.evalCode = ''
        event.player.tell('§cEval code cleared!§r')
        event.cancel()
    }
})