

import { useState } from 'react'



const food  = [
  {name: "potato", description: "brown thing",id: 1},
  {name: "tomato", description: "red thing" ,id: 2},
  {name: "cabbage", description: "green thing" ,id: 3}
]

function App() {

  const [currentFood, setFood] = useState(food);

  var newItem = {name: "mango", description: "yellow thing" ,id: 4};


  function addItem(){

    setFood( (currentFood) => {
  

      var newF = [...currentFood, newItem];

      console.log(newF);
      return newF;
    });
  }

 var printFood = currentFood.length == 0 ?  
 <h1> no food.</h1> 
 : currentFood.map((item) => {

    return <li key={item.id}>{item.name} - {item.description}</li>
    
 })

  


  return (
    <>
      <ul>{printFood}</ul>
      <button onClick={addItem}>Add food</button>
    </>
  )
}




export default App
