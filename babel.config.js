// const path = require('path')
// module.exports = {
//     "presets": ["react", "es2015"],
//     transform: { "\\.ts$": ['ts-jest'] },
// };


module.exports = {
    "env": {
        "test": {
            "presets": [
                "@babel/preset-env",
                "@babel/preset-react"
            ]
        }
    }
}