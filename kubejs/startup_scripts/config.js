global['ArcaFirma']['Config'] = {}

ConfigsEvent.common(event => {
    event.setName('arcafirma-common')

    event.push('features')
        global['ArcaFirma']['Config']['features'] = {}
        
    event.pop()

    event.push('debug')
        global['ArcaFirma']['Config']['debug'] = {}
        event.comment(
            'Enable debug logging? May become spammy.',
        )
        global['ArcaFirma']['Config']['debug']['enableLogging'] = event.booleanValue('enableLogging', false)
    event.pop()
})