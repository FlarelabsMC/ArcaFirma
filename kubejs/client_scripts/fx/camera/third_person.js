// priority: 0

const $SSClientConfig = Java.loadClass('com.teamderpy.shouldersurfing.config.Config').CLIENT
const $SSKeyHandler = Java.loadClass('com.teamderpy.shouldersurfing.client.KeyHandler')

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

let lastPos = new Vec3f(0, 0, 0)
let isSwappedShoulder = false
let swapShoulderCooldown = 0
let isZooming = false
let needsUpdate = false

ClientEvents.tick(event => {
    /**
        Constants
        TODO: make camera offsets configurable
    */
    const { player } = event, { options, currentScreen } = Client

    if ($SSKeyHandler.KEYBIND_SWAP_SHOULDER.isDown() && swapShoulderCooldown == 0) {
        isSwappedShoulder = !isSwappedShoulder
        swapShoulderCooldown = 5
    }
    if (swapShoulderCooldown > 0) swapShoulderCooldown--

    let pos = new Vec3f(player.x, player.y, player.z)

    const movementVector = new Vector3f((pos.x() - lastPos.x()), 0, (pos.z() - lastPos.z()));
    const lookVector = new Vector3f(JavaMath.cos(JavaMath.toRadians(player.yHeadRotO + 90)), 0, JavaMath.sin(JavaMath.toRadians(player.yHeadRotO + 90)));

    const cameraOffsetCloseZ = 2.0, cameraOffsetCloseY = 0.75
    const cameraOffsetBaseZ = 7.0, cameraOffsetBaseY = 1.0, cameraOffsetBaseX = 0.0
    const cameraOffsetZoomZ = 2.0, cameraOffsetZoomY = 0, cameraOffsetZoomX = -0.8

    let mutableOffset = {
        x: 0,
        y: 0,
        z: 0,
    }

    /*
        Functions
    */
    // offset the camera based on the player's motion
    function setOffset(offsetX, offsetY, offsetZ) {
        if ($SSClientConfig.getOffsetX() != offsetX) $SSClientConfig.setOffsetX(offsetX)
        if ($SSClientConfig.getOffsetY() != offsetY) $SSClientConfig.setOffsetY(offsetY)
        if ($SSClientConfig.getOffsetZ() != offsetZ) $SSClientConfig.setOffsetZ(offsetZ)
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
                mutableOffset.x = cameraOffsetBaseX
                mutableOffset.y = cameraOffsetCloseY
                mutableOffset.z = cameraOffsetCloseZ
                cameraType(0)
            } else if (firstPersonItemsInHand) {
                mutableOffset.x = cameraOffsetBaseX
                mutableOffset.y = cameraOffsetBaseY
                mutableOffset.z = cameraOffsetBaseZ
                cameraType(1)
            } else {
                mutableOffset.x = cameraOffsetBaseX
                mutableOffset.y = cameraOffsetBaseY
                mutableOffset.z = cameraOffsetBaseZ
                cameraType(0)
            }
            break
        case false:
            if (!global['keys']['ZOOM'].isDown()) {
                mutableOffset.x = cameraOffsetBaseX
                mutableOffset.y = cameraOffsetBaseY
                mutableOffset.z = cameraOffsetBaseZ
                cameraType(0)
                isZooming = false
            } else {
                mutableOffset.x = isSwappedShoulder ? cameraOffsetZoomX : -cameraOffsetZoomX
                mutableOffset.y = cameraOffsetZoomY
                mutableOffset.z = cameraOffsetZoomZ
                cameraType(0)
                isZooming = true
            }
            if (event.player.isVisuallyCrawling()) {
                mutableOffset.x = cameraOffsetZoomX
                mutableOffset.y = cameraOffsetZoomY
                mutableOffset.z = cameraOffsetZoomZ
                cameraType(0)
            }
            break
    }

    if ($SSClientConfig.getOffsetX() != mutableOffset.x || $SSClientConfig.getOffsetY() != mutableOffset.y || $SSClientConfig.getOffsetZ() != mutableOffset.z) {
        setOffset(mutableOffset.x, mutableOffset.y, mutableOffset.z)
    }

    lastPos = pos
})