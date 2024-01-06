// priority: 10000

global['LOGGER'] = Java.loadClass('org.apache.logging.log4j.LogManager').getLogger('ArcaFirma')

global['ArcaFirma'] = {
    registry: {
        items: {
            foci: [
                'conjuration',
                'destruction',
                'restoration',
                'transmutation',
                'binding',
                'augmentation',
                'alteration',
                'illusion',
                'inspiration',
            ],
            salts: [
                'amethyst', // Shadow
                'diamond', // Soul
                'emerald', // Decay
                'ruby', // Death
                'sapphire', // Ice
                'opal', // Chaos
                'lapis', // Storm
                'pyrite', // Unluck
                'topaz', // Catalyst
            ],
            sugars: [
                'amethyst', // Light
                'diamond', // Spirit
                'emerald', // Nature
                'ruby', // Life
                'sapphire', // Water
                'opal', // Order
                'lapis', // Rain
                'pyrite', // Luck
                'topaz', // Catalyst
            ]
        },
        sounds: [
            'wand_bind',
            'arrow_wind',
            'river'
        ]
    },
    features: {
        inspect: {
            en_us: {
                // Salts
                'arcafirma:magic/salt/amethyst': 'It casts a weird shadow. It looks like it\'s moving.',
                'arcafirma:magic/salt/diamond': 'It sounds like it\'s whispering to me.',
                'arcafirma:magic/salt/emerald': 'It smells awful.',
                'arcafirma:magic/salt/ruby': 'It\'s cold and lifeless.',
                'arcafirma:magic/salt/sapphire': 'It\'s extremely cold.',
                'arcafirma:magic/salt/opal': 'It\'s giving me a headache just looking at it. It\'s undescribable.',
                'arcafirma:magic/salt/lapis': 'It smells like rain and shocks me when I touch it.',
                'arcafirma:magic/salt/pyrite': 'I don\'t know what it is, but it\'s giving me a bad feeling.',
                'arcafirma:magic/salt/topaz': 'It\'s dull, but it seems like it could be useful.',
                // Sugars
                'arcafirma:magic/sugar/amethyst': 'It\'s bright.',
                'arcafirma:magic/sugar/diamond': 'I can feel it beating alongside my heart.',
                'arcafirma:magic/sugar/emerald': 'It smells like flowers.',
                'arcafirma:magic/sugar/ruby': 'It\'s warm and pulsing. It also looks tasty.',
                'arcafirma:magic/sugar/sapphire': 'It\'s cold and wet. If I put it near water, the water attracts to it.',
                'arcafirma:magic/sugar/opal': 'It\'s very stable. It just sits there.',
                'arcafirma:magic/sugar/lapis': 'It\'s very slippery.',
                'arcafirma:magic/sugar/pyrite': 'I have a good feeling about this one.',
                'arcafirma:magic/sugar/topaz': 'It seems like it could be useful.',
            }
        }
    }
}

global['TFC'] = {}

global['TFC']['logs'] = [
    'tfc:wood/log/acacia',
    'tfc:wood/log/ash',
    'tfc:wood/log/aspen',
    'tfc:wood/log/birch',
    'tfc:wood/log/blackwood',
    'tfc:wood/log/chestnut',
    'tfc:wood/log/douglas_fir',
    'tfc:wood/log/hickory',
    'tfc:wood/log/kapok',
    'tfc:wood/log/mangrove',
    'tfc:wood/log/maple',
    'tfc:wood/log/oak',
    'tfc:wood/log/palm',
    'tfc:wood/log/pine',
    'tfc:wood/log/rosewood',
    'tfc:wood/log/sequoia',
    'tfc:wood/log/spruce',
    'tfc:wood/log/sycamore',
    'tfc:wood/log/white_cedar',
    'tfc:wood/log/willow',
]

global['KUtils'] = {
    server: {
        /**
         * @side SERVER
         * @returns {Internal.Entity}
         */
        getEntityByUUID: function (uuid) {
            /**
             * @type {Internal.EntityArrayList}
             */
            let entities = Utils.server.getEntities()
            return entities.find(entity => entity.uuid == uuid)
        }
    },
    level: {
        /**
         * The marker has persistent data that stores the sound, volume, and pitch as a string.
         * Another script handles the sound being played at the marker's position by using the method `playSound()` on the entity.
         * The marker is then killed.
         * @param {Internal.Level} level
         * @param {string} sound
         * @param {Internal.BlockPos} pos
         * @param {number} volume
         * @param {number} pitch
         * @side SERVER
         * @returns {void}
         */
        playSoundAt: function (level, sound, pos, volume, pitch) {
            let soundbyte = level.createEntity('minecraft:marker')
            soundbyte.persistentData.isSoundByte = true
            soundbyte.persistentData.storedSound = `${sound}|${volume}|${pitch}`
            soundbyte.persistentData.timeLeft = 1
            soundbyte.x = pos.x + 0.5
            soundbyte.y = pos.y
            soundbyte.z = pos.z + 0.5
            soundbyte.spawn()
        }
    }
}

global['LOGGER'].debug(`Loaded globals. Continuing...`)