import { useState } from "react";
import "./App.css";
import mathbg from "./assets/math.jpg";

async function calculateAnswer() {

  try{

    const response = await fetch(
      `https://api.mathjs.org/v4/?expr=${encodeURIComponent(display)}`
    );

    const result = await response.text();

    setDisplay(result);

  }

  catch{

    setDisplay("Error");

  }

}
function App() {

  const [display, setDisplay] = useState("");

  const buttons = [
    "%", "1/x", "CE", "C",
    "1", "2", "3", "/",
    "4", "5", "6", "*",
    "7", "8", "9", "+",
    "+/-", "0", ".", "="
  ];

  function handleClick(value){

    if(value==="C"){
      setDisplay("");
      return;
    }

    if(value==="CE"){
      setDisplay(display.slice(0,-1));
      return;
    }

    if(value==="="){

      try{
         calculateAnswer();
         return;
      }

      catch{
        setDisplay("Error");
      }

    }

    if(value==="1/x"){

      try{
        let result=1/eval(display);
        setDisplay(result.toString());
      }

      catch{
        setDisplay("Error");
      }

      return;
    }

    if(value==="+/-"){

      setDisplay((-display).toString());
      return;
    }

    setDisplay(display+value);
  }

  function isPrime(num){

    num=Number(num);

    if(num<2){
      return "No";
    }

    for(let i=2;i<=Math.sqrt(num);i++){

      if(num%i===0){
        return "No";
      }

    }

    return "Yes";
  }

function factorial(num){
  num = Number(num);

  if(num < 0 || !Number.isInteger(num)){
    return "-";
  }

  let fact = 1;
  for(let i = 1; i <= num; i++){
    fact *= i;
  }

  // Returns a number like 120 (trailing zeros are dropped in JS numbers)
  return Math.round(fact * 100) / 100; 
}

  



  return(

    <div
      className="container"
      style={{
        backgroundImage:`url(${mathbg})`
      }}
    >

      <h1>CALCULATOR</h1>

      <div className="main">

        <div className="side">
          PRIME = {
            display && !isNaN(display)
            ? isPrime(display)
            : "-"
          }
        </div>

        <div className="calculator">

          <input
            type="text"
            value={display}
            className="display"
            readOnly
          />

          <div className="buttons">

            {
              buttons.map((btn)=>(
                <button
                  key={btn}
                  onClick={()=>handleClick(btn)}
                >
                  {btn}
                </button>
              ))
            }

          </div>

        </div>

        <div className="side">

          FACTORIAL = {

            display && !isNaN(display)

            ? factorial(display)

            : "-"

          }

        </div>

      </div>

    </div>

  );
}

export default App;