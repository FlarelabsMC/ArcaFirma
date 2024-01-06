global.ArcaFirma.registry.items.ALL = []

StartupEvents.registry('item', event => {
    global['ArcaFirma']['registry']['items']['foci'].forEach(name => {
        global['ArcaFirma']['registry']['items']['ALL'].push(
            event.create(`arcafirma:magic/focus/${name}`).unstackable().tag('arcafirma:foci')
        )
    })
    global['ArcaFirma']['registry']['items']['salts'].forEach(name => {
        global['ArcaFirma']['registry']['items']['ALL'].push(
            event.create(`arcafirma:magic/salt/${name}`).unstackable().tag('arcafirma:salts')
        )
    })
    global['ArcaFirma']['registry']['items']['sugars'].forEach(name => {
        global['ArcaFirma']['registry']['items']['ALL'].push(
            event.create(`arcafirma:magic/sugar/${name}`).unstackable().tag('arcafirma:sugars')
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