import http from "http"
import fs from "fs"
import path from "path"

const app = http.createServer((req, res) => {
    if(req.url === `/`) {
        const webpage = fs.readFileSync(path.join("pages", "home.html"))
        res.end(webpage)
    } else if(req.url === `/about`) {
        const webpage = fs.readFileSync(path.join("pages", "about.html"))
        res.end(webpage)
    } else if(req.url === `/contact`) {
        const webpage = fs.readFileSync(path.join("pages", "contact.html"))
        res.end(webpage)
    } else if(req.url === `/details`) {
        const webpage = fs.readFileSync(path.join("pages", "details.html"))
        res.end(webpage)
    } else if(req.url === `/login`) {
        const webpage = fs.readFileSync(path.join("pages", "login.html"))
        res.end(webpage)
    } else if(req.url === `/register`) {
        const webpage = fs.readFileSync(path.join("pages", "register.html"))
        res.end(webpage)
    } else if(req.url === `/search`) {
        const webpage = fs.readFileSync(path.join("pages", "search.html"))
        res.end(webpage)
    } else {
        const webpage = fs.readFileSync(path.join("pages", "404.html"))
        res.end(webpage)
    }
})
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})

