const auth = (req, res, next) => {
    if(req.query.username == "Carolina") {
        next()
    }else {
        res.send("You are noth authorize for this page")
    }
}

export default auth;