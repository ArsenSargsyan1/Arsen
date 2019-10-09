var os = require("os");
var message = "The platform us";

function main(){
    console.log(message + os.platform())
}
main();