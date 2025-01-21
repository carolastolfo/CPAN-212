for (let index = 0; index < 5; index++){
    console.log(5)
}

console.log(`------------------------------`)
for (var index = 0; index < 5; index++){
    console.log(5)
}

console.log(`\n next test`)

for (let index = 0; index < 5; index++){
    setTimeout( () => {
        console.log(`this is let variable ${index}`)
    }, 1000)
}

console.log(`------------------------------`)
for (var index = 0; index < 5; index++) {
    setTimeout( () => {
        console.log(`this is var variable ${index}`)
    }, 1000)
} //this prints 5 instead of the index
