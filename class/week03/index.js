import express from "express"
import dotenv from "dotenv"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 8000

// CRUD -> Server is setup to do this things

// Methods: GET(READ), POST(CREATE), PUT(UPDATE), DELETE    

app.get("/", (req, res) => {
    res.send("Welcome to the server - GET")
})
app.post("/", (req, res) => {
    res.send("Welcome to the server - POST")
})
app.put("/", (req, res) => {
    res.send("Welcome to the server - PUT")
})
app.delete("/", (req, res) => {
    res.send("Welcome to the server - DELETE")
})

app.get("/search", (req, res) => {
    console.log(req.url)
    console.log(req.headers)
    console.log(req.query)
    console.log(req.params)
    console.log(req.body)
    res.send("You came to the /search route")
})

app.get("/item/:itemID", (req, res) => {
    console.log(req.url)
    console.log(req.headers)
    console.log(req.query)
    console.log(req.params)
    console.log(req.body)
    res.send("You came to the /item route")
})


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})


// /search?video=how%20to%20tie%20a%20tie
// {
//   'accept-encoding': 'gzip, deflate, br',
//   accept: '*/*',
//   'user-agent': 'Thunder Client (https://www.thunderclient.com)',
//   host: 'localhost:9000',
//   connection: 'close'
// }
// { video: 'how to tie a tie' }
// {}
// undefined

// /search
// {
//   host: 'localhost:9000',
//   connection: 'keep-alive',
//   'cache-control': 'max-age=0',
//   'sec-ch-ua': '"Chromium";v="130", "Opera";v="115", "Not?A_Brand";v="99"',
//   'sec-ch-ua-mobile': '?0',
//   'sec-ch-ua-platform': '"macOS"',
//   'upgrade-insecure-requests': '1',
//   'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 OPR/115.0.0.0',
//   accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
//   'sec-fetch-site': 'none',
//   'sec-fetch-mode': 'navigate',
//   'sec-fetch-user': '?1',
//   'sec-fetch-dest': 'document',
//   'accept-encoding': 'gzip, deflate, br, zstd',
//   'accept-language': 'en-US,en;q=0.9',
//   'if-none-match': 'W/"1d-9r9v8vhnBv16C0dGuexOJzNtyiI"'
// }
// {}
// {}
// undefined