StartupEvents.registry('sound_event', event => {
    global['ArcaFirma']['registry']['sounds'].forEach(name => {
        event.create(`arcafirma:${name}`)
    })
})