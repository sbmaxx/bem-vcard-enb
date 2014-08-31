({
    mustDeps: [
        {
            block: 'font',
            mods: { face: 'textbook-new' }
        },
        {
            block: 'card'
        },
        {
            block: 'metrika'
        }
    ],
    noDeps: [
        {
            block: 'i-bem'
        },
        {
            block: 'i-bem', elem: 'dom'
        },
        {
            block: 'i-bem',
            elem: 'dom',
            mods: { init: [true, 'auto'] }
        },
        {
            block: 'ua'
        }
    ]
})
