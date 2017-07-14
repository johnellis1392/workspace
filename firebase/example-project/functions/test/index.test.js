const _ = require('underscore')
const glob = require('glob')

const files = glob.sync("../**/*.spec.js", {
    cwd: __dirname,
    ignore: [
        '../node_modules/**/*'
    ]
})


const toFileTree = (fileComponents) => {
    if (fileComponents.length === 0) {
        return null
    } else if (fileComponents.length === 1) {
        return fileComponents[0]
    } else {
        return {
            [fileComponents[0]]: toFileTree(fileComponents.slice(1))
        }
    }
}

const deepAssign = (o1, o2) => {
    if (!_.isObject(o1) && !_.isObject(o2)) {
        return o2
    }

    return _.mapObject(o2, (v2, key) => {
        const v1 = o1[key]
        if (v1 && _.isObject(v1)) {
            return deepAssign(v1, v2)
        } else {
            return v2
        }
    })
}

const constructFileTree = (filenames) => {
    return _.reduce({}, (filemap, file) => {
        const fileComponents = file.split("/").slice(1)
        return deepAssign(filemap, toFileTree(fileComponents))
    })
}


const evaluateTests = (filenames) => {
    _.each(filenames, (file) => {
        describe(file, () => {
            require(file)
        })
    })
}

// TODO: Finish writing test file
// 1. Recursively add .spec.js files from src directory
// 2. Use describe block to execute each file and report

// Basic version:
// describe(filename, () => {
//     require(filename)
// })
