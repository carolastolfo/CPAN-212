
const logger = (req, res, next) => { //next is to continue. It needs to be in the third position
    console.log(req.url)
    console.log(req.method)
    // console.log(req.headers)
    console.log(Date())
    next()
}

export default logger;