function showMultiplication(num){
   for (var i = 1; i < 10; i++){
       console.log(num + "x" + i + "=" + num * i);
   }
}
// number 3

// for(var i = 0; i >= 100; i++){
//     if(i === 21){
//         alert("Hello, Marcs favorite number");
//     }   else if (i === 22) {
//         alert("Hello lucky");
//     }
//     console.log(i);
//
// }
function isItEven(num){
    if(num % 2 === 0){
        return "even";
    }else{
        return "odd"
    }
}

for (var i = 0; i < 10; i++){
    var randomNumber = Math.random() * (200 - 20) + 20;
    console.log(parseInt(randomNumber)) + " is " + isItEven(parseInt(randomNumber))
}

