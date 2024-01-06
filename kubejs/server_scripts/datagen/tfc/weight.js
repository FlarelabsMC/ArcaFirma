ServerEvents.highPriorityData(event => {
    let SH = "huge"
    let SVL = "very_large"
    let SL = "large"
    let SN = "normal"
    let SS = "small"
    let SVS = "very_small"

    let WVH = "very_heavy"
    let WH = "heavy"
    let WN = "medium"
    let WL = "light"
    let WVL = "very_light"

    const ITEMS = {
        "supplementaries:bomb": {
            size: SL,
            weight: WH
        },
    }
    Object.keys(ITEMS).forEach(ing => {
        let name = ing.split(":")[1]
        let size = ITEMS[ing].size
        let weight = ITEMS[ing].weight
        event.addJson(`arcafirma:tfc/item_sizes/${name}`, {
            ingredient: {
                item: ing
            },
            size: size,
            weight: weight
        })
    })

    const TAGS = {
        "arcafirma:salts": {
            size: SS,
            weight: WVL
        },
        "arcafirma:sugars": {
            size: SS,
            weight: WVL
        },
    }
    Object.keys(TAGS).forEach(tag => {
        let name = tag.split(":")[1]
        let size = TAGS[tag].size
        let weight = TAGS[tag].weight
        event.addJson(`arcafirma:tfc/item_sizes/${name}`, {
            ingredient: {
                tag: tag
            },
            size: size,
            weight: weight
        })
    })
})