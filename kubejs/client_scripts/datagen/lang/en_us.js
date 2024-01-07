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
})