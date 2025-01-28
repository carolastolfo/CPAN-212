import express from "express"

const router = express.Router()

//check if in route
router.get("/", (req, res) => {
    res.send("Welcome to the lab router")
})

// name route
router.get("/name", (req, res) => {
    res.send("Carolina Astolfo")
})

//greeting
router.get("/greeting", (req, res) => {
    res.send("Hello from Carolina Astolfo \nStudent number: 01651294")
})

//add
router.get("/add/:x/:y", (req, res) => {
    let {x, y} = req.params
    res.send(`${(Number(x) + Number(y))}`)
})

//calculate
router.get("/calculate/:a/:b/:operation", (req, res) => {
    let a = parseInt(req.params.a)
    let b = parseInt(req.params.b)
    let operation = req.params.operation
    let result = 0
    switch (operation) {
        case "+":
            result = a + b
            break;
        case "-":
            result = a - b
            break;                
        case "*":
            result = a * b
            break;
        case "/": // we have to send this %2F as parameter
            if( b == 0){
                res.send("You trying to divide by 0, maybe don't do that")
                break;
            }else{
            result = a / b}
            break;  
        case "**":
            result = a ** b
            break;  
        default:
            res.send("Invalid operator")
            break;
    }
    res.send(`${result}`)
})

export default router