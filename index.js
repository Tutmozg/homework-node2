const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 3000
const createPath = (page) => path.resolve(__dirname, 'pages', `${page}.html`)
const server = http.createServer((req, res) => {
    console.log('server req')
    let basePath = ''

    switch (req.url) {
        case '/':
        case '/main':
        case '/home':
        case '/index':
            res.setHeader('Content-Type', 'text/html')
            basePath = createPath('index')
            res.statusCode = 200
            break
        case '/page3':
            res.setHeader('Content-Type', 'text/html')
            basePath = createPath('page3')
            res.statusCode = 200
            break
        case '/page1':
            res.setHeader('Content-Type', 'text/html')
            basePath = createPath('page1')
            res.statusCode = 200
            break
        case '/page2':
            res.setHeader('Content-Type', 'text/html')
            basePath = createPath('page2')
            res.statusCode = 200
            break
        case '/page4':
            res.setHeader('Content-Type', 'application/json')
            basePath = createPath('page4')
            const data = JSON.stringify([
                { name: 'Иван', age: 30 },
                { name: 'Анатолий', age: 40 }
            ])
            res.end(data)
            break
        case '/page5':
            res.setHeader('Content-Type', 'text/plain')
            basePath = createPath('page5')
            break
        default:
            const createPathError = (page) => path.resolve(__dirname, 'pages', `${page}.html`)
            basePath = createPathError('error')
            res.statusCode = 404
            break
    }

    fs.readFile(basePath, (err, data) => {
        if (err) {
            console.log(err)
            res.statusCode = 500
            res.end()
        }
        else {
            res.write(data)
            res.end()
        }
    })

})

server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
})