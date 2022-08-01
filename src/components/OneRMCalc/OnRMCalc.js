import React from 'react'

const OnRMCalc = () => {
    window.onload = function(){
        const calcButton = document.getElementById("submit");
        calcButton.addEventListener("click", function(e){
            let firstWeight = document.getElementById("weight").value;
            let firstReps = document.getElementById("reps").value;
    
            if ((firstReps >= 1 && firstReps <=30) && (firstWeight >= 1 && firstWeight <= 1500)){
    
                //get one rep max
                let oneRepMax = calculateOneRep(firstWeight, firstReps);
    
                //change h2 to list one rep max weight
                let unit = document.getElementById("unit").value; //grabs unit (kg or lb)
                let ormHeader = document.getElementById("ormHeader");
                ormHeader.innerHTML = "Your one-rep max is: " + oneRepMax + " " + unit + "s";
    
                //if table already exists, delete
                let existingRows = document.querySelectorAll('tr');
                for (let i=0; i<existingRows.length; i++){
                    let columns = existingRows[i].querySelectorAll('td');
                    for (let j=0; j<columns.length; j++){
                        existingRows[i].removeChild(columns[j]);
                    }
                }
    
                //fill in table header
                let tableHeader = document.getElementsByTagName("th");
                tableHeader[0].innerHTML = "Repetitions";
                tableHeader[1].innerHTML = "Weight";
                tableHeader[2].innerHTML = "Percentage of 1RM";
    
    
                //initialize table
                let table = document.getElementById("tableBody");
                
                for (let i=1; i<=30; i++){
                    let weightText = calculateWeight(oneRepMax, i)
                    let percentText = calculatePercent(i);
                    
                    //adds row to table
                    let row = table.insertRow(i-1);
                    let col1 = row.insertCell(0);
                    let col2 = row.insertCell(1);
                    let col3 = row.insertCell(2);
    
                    col1.innerHTML = i;
                    col2.innerHTML = weightText + " " + unit;
                    col3.innerHTML = percentText + "%";
                }
            } else {
                alert("Lift must be 1 to 1500 \r\nReps must be 1 to 30");
            }
    
        });
    }
    
    function calculateOneRep(weight, reps){ //calculates one rep max
        let percent = 100 - (reps * 2.5);
        let max = (weight / (percent/100)).toFixed(2).replace(/[.,]00/,"");
        return max;
    }
    
    function calculateWeight(maxWeight, reps){
        let percent = 100 - (reps * 2.5);
        let weight = (maxWeight * (percent/100)).toFixed(2).replace(/[.,]00/,"");
        return weight;
    }
    
    function calculatePercent(reps){
        let percent = (100 - (reps * 2.5)).toFixed(0);
        return percent;
    }
  return (
    <>
    <h1>One Rep Max Calculator</h1>
    <form action="" method="post">
        <div>
            <p>Calculate your one-rep max (1RM) for any lift. Your one-rep max is the max weight you can lift for a single repetition for a given exercise.</p>
            <div><label htmlFor="liftmass"> Lift </label></div>
            <div>
                <div>
                 <div><input max="1500" min="1" name="liftmass" required="required" step="0.1" type="number" id="weight" autoComplete="off"/></div>
                    <div>
                        <div><select name="liftmassunit" id="unit">
                                <option>kg</option>
                                <option>lb</option>
                            </select></div>
                    </div>
                </div>
            </div>
        </div>
        <div>

            <div><label htmlFor="repetitions">Repetitions</label></div>
            
            <div><input max="30" min="1" name="repetitions" type="number" id="reps" autoComplete="off"/></div>
        </div>
        <div>
            <div>
                <div>
                    <button type="button" id="submit">Calculate your One-Rep Max</button>
                </div>
            </div>
        </div>
    </form>
    <h2 id="ormHeader"> </h2>
    <table>
        <thead>
            <tr>
                <th></th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody id="tableBody">
        </tbody>
    </table>
    <div></div>
    </>
  )
}

export default OnRMCalc