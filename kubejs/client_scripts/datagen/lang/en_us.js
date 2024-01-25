ClientEvents.lang('en_us', event => {
    global['ArcaFirma']['registry']['items']['foci'].forEach(name => {
        let a = name.charAt(0).toUpperCase() + name.slice(1)
        event.add(`item.arcafirma.magic.focus.${name}`, `${a} Focus`)
    })
    global['ArcaFirma']['registry']['items']['salts'].forEach(name => {
        let a = name.charAt(0).toUpperCase() + name.slice(1)
        event.add(`item.arcafirma.magic.salt.${name}`, `${a} Salt`)
    })
    global['ArcaFirma']['registry']['items']['sugars'].forEach(name => {
        let a = name.charAt(0).toUpperCase() + name.slice(1)
        event.add(`item.arcafirma.magic.sugar.${name}`, `${a} Sugar`)
    })
    global['TFC']['logs'].forEach(log => {
        let id = log.split('/')[2]
        let wood = log.split('/')[2].split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        event.add(`item.arcafirma.magic.staff.${id}`, `${wood} Staff`)
    })

    //Inspect deez nuts
    Object.keys(global['ArcaFirma']['features']['inspect']['en_us']).forEach(key => {
        let item = Item.of(key).getDescriptionId()
        let obj = global['ArcaFirma']['features']['inspect']['en_us'][key]
        event.add(`${item}.inspect`, obj)
    })

    event.add('arcafirma.inspect.default_1', 'This isn\'t very interesting.')
    event.add('arcafirma.inspect.default_2', 'It\'s a thing.')
    event.add('arcafirma.inspect.default_3', 'It\'s... something.')

    event.add('arcafirma.remove_focus', 'If I remove the focus from the wand, it may be destroyed...')

    event.add('options.difficulty.easy', 'Classic')
    event.add('options.difficulty.normal', 'Expert')
    event.add('options.difficulty.hard', 'Master')
    event.add('options.difficulty', 'Mode')

    event.add('createWorld.tab.game.title', 'General')
    event.add('createWorld.tab.more.title', 'Misc')
    
    event.add('selectWorld.create', 'Create')
    event.add('selectWorld.enterName', 'Enter name')
    event.add('selectWorld.gameMode', 'Type')

    event.add('createWorld.preparing', ' ')

    event.add('arcafirma.death.title', 'You died...')

    event.add('selectWorld.allowCommands', 'Enable DevEnv')
    event.add('lanServer.otherPlayers', 'Settings')
})