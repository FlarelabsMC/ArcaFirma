// priority: 0

const $SSClientConfig = Java.loadClass('com.teamderpy.shouldersurfing.config.Config').CLIENT

const zoomItems = [
    'minecraft:bow',
    'tfc:stone/javelin/igneous_extrusive',
    'tfc:stone/javelin/igneous_intrusive',
    'tfc:stone/javelin/metamorphic',
    'tfc:stone/javelin/sedimentary',
    'tfc:metal/javelin/bismuth_bronze',
    'tfc:metal/javelin/black_bronze',
    'tfc:metal/javelin/bronze',
    'tfc:metal/javelin/copper',
    'tfc:metal/javelin/wrought_iron',
    'tfc:metal/javelin/steel',
    'tfc:metal/javelin/black_steel',
    'tfc:metal/javelin/red_steel',
    'tfc:metal/javelin/blue_steel',
]
const firstPersonItems = [
    'minecraft:spyglass',
]

ClientEvents.tick(event => {
    /**
        Constants
        TODO: make camera offsets configurable
    */
    const { player } = event, { options, currentScreen } = Client

    // I'll probably let some of these be a config option some time soon
    const cameraOffsetCloseZ = 2.0, cameraOffsetCloseY = 0.75
    const cameraOffsetBaseZ = 5.0, cameraOffsetBaseY = 1.0, cameraOffsetBaseX = 0.0
    const cameraSmoothMin = 0.2, cameraSmoothMax = 2.0
    const cameraOffsetZoomZ = 2.0, cameraOffsetZoomY = 0, cameraOffsetZoomX = -0.8

    /*
        Functions
    */
    // offset the camera based on the player's motion
    function cameraSmooth() {
        let motionY = player.getDeltaMovement().y()
        let yOffset = 1.0 + (-motionY * 0.5)
        $SSClientConfig.setOffsetY(clamp(yOffset, cameraSmoothMin, cameraSmoothMax))
    }
    function setOffset(offsetX, offsetY, offsetZ) {
        $SSClientConfig.setOffsetX(offsetX)
        $SSClientConfig.setOffsetY(offsetY)
        $SSClientConfig.setOffsetZ(offsetZ)
    }
    function setOffsetAndSmooth(offsetX, offsetY, offsetZ) {
        setOffset(offsetX, offsetY, offsetZ)
        cameraSmooth()
    }
    function cameraType(type) {
        switch (type) {
            case 0:
                options.setCameraType('third_person_back')
                break
            case 1:
                options.setCameraType('first_person')
                break
        }
    }



    const firstPersonItemsInHand = firstPersonItems.some(item =>
        player.getMainHandItem().getId() == item || player.getOffHandItem().getId() == item
    )
    const zoomItemsInHand = zoomItems.some(item =>
        player.getMainHandItem().getId() == item || player.getOffHandItem().getId() == item
    )

    switch (Client.player.isUsingItem()) {
        case true:
            if (zoomItemsInHand) {
                setOffsetAndSmooth(cameraOffsetBaseX, cameraOffsetCloseY, cameraOffsetCloseZ)
                cameraType(0)
            } else if (firstPersonItemsInHand) {
                cameraType(1)
            } else {
                setOffsetAndSmooth(cameraOffsetBaseX, cameraOffsetBaseY, cameraOffsetBaseZ)
                cameraType(0)
            }
            break
        case false:
            if (!global['keys']['ZOOM'].isDown()) {
                setOffsetAndSmooth(cameraOffsetBaseX, cameraOffsetBaseY, cameraOffsetBaseZ)
                cameraType(0)
            } else {
                setOffset(cameraOffsetZoomX, cameraOffsetZoomY, cameraOffsetZoomZ)
                cameraType(0)
            }
            break
    }
})