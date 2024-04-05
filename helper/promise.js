async function run(){
    console.log("start ");
    await new Promise((resolve, reject) =>{
        setTimeout(() => {
            resolve('in');       
        }, 2000);
    }).then((str) =>{
        console.log(str);
    })
    console.log("out");
}
run();