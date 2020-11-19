(function(){
  
    var symbols = ["C","/","*","7","8","9","-","+","4","5","6","1","2","3","0",",","="]

    for(var i = 0; i < symbols.length; i++){
        var button = document.createElement("div");
        button.classList.add("button")
        button.classList.add(`btn${symbols[i]}`)
        button.innerHTML = symbols[i]
        button.addEventListener("click", setButton)
        document.querySelector(".teclado").appendChild(button)
    }
     var firstNumber = undefined;
     var operator = undefined;
     var secondNumber = undefined
     
     document.querySelector(".darkMode").addEventListener("click", renderdark)

     darkMode = localStorage.getItem("dark")
    if(darkMode === "true"){
        document.querySelector("body").classList.add("dark")
        document.querySelector(".darkMOde").checked = true
        localStorage.setItem("dark", true)
    }
    function renderdark(event){
        document.querySelector("body").classList.toggle("dark")

        if(document.querySelector("body").className === "dark"){
           
            localStorage.setItem("dark", true)
        }else{
            localStorage.setItem("dark", false)
        }
    }
     function setButton(event){
    
        decreaseFont()
        if(event.target.innerText === "C"){
            firstNumber = undefined
            operator = undefined
            document.querySelector(".tela").innerText = "0"
            document.querySelector(".tela").style.fontSize =  "80px"
            return
        }
        if(event.target.innerText === "0" && firstNumber === undefined){
            return
        }
        if(event.target.innerText === ","){
            if(firstNumber === undefined){
                firstNumber = "0,"
                document.querySelector(".tela").innerText = "0,"
                return
            }
            if(firstNumber.indexOf(",") > -1){
                return
            }
        }
        if(event.target.innerText === "/" || event.target.innerText === "*" || event.target.innerText === "-" || event.target.innerText === "+"){
            operator = event.target.innerText
            secondNumber = firstNumber
            firstNumber = undefined;
            render(event, true)
            return
        }
        if(event.target.innerText === "="){
            if(firstNumber === undefined || secondNumber === undefined){
                return
            }
            if(secondNumber.indexOf(",") > -1){
                secondNumber = secondNumber.replace(",",".")
            }
            if(firstNumber.indexOf(",") >-1){
                firstNumber.replace(",", ".")
            }
            var result = eval(`${secondNumber} ${operator} ${firstNumber}`)
            render(event, false, result)
            return
        }
            render(event, false, undefined)        
}
    function decreaseFont(){
        var number = String(firstNumber)
        if(number.length > 9){
            document.querySelector(".tela").style.fontSize =  "40px"
        }
        if(number.length <= 9){
            console.log(number)
            document.querySelector(".tela").style.fontSize =  "80px"
        }
        if(number.length > 18){
            document.querySelector(".tela").style.fontSize =  "20px"
        }
    }
   function render(event, isOperator, result){
      
        if( result !== undefined){
            let resultado  = String(result)
            
            if(resultado.indexOf(".") > -1){
                    result = resultado.replace(".",",")
            
            }
            document.querySelector(".tela").innerText = String(result)
            secondNumber = undefined
            firstNumber = String(result);
            operator = undefined;
            return
        }
        if(isOperator){
            document.querySelector(".tela").innerText = "0"
            return
        }
        if(firstNumber === undefined){
            firstNumber = String(event.target.innerText)
            document.querySelector(".tela").innerText = firstNumber
            
        }else{
            firstNumber = String(firstNumber) + String(event.target.innerText)
            document.querySelector(".tela").innerText = firstNumber
        }

    }
})()