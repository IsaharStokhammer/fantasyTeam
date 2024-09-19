const pointGuardContainer = document.getElementById("pointGuardContainer");
const sootingGuardContainer = document.getElementById("shootingGuardContainer");
const smallForwardContainer = document.getElementById("smallForwardContainer");
const powerForwardContainer = document.getElementById("powerForwardContainer");
const centerContainer = document.getElementById("centerContainer");

const playerTableBody = document.getElementById("playerTableBody");

const searchFrom = document.getElementById("searchFrom");
searchFrom!.addEventListener("submit",(e:Event)=>{
    e.preventDefault();
})
const positionSearch = document.getElementById("positionSearch") as HTMLFormElement;
const pointsSearch = document.getElementById("pointsSearch") as HTMLFormElement;
const threeSearch = document.getElementById("3Search") as HTMLFormElement;
const twoSearch = document.getElementById("2Search") as HTMLFormElement;

const searchButton = document.getElementById("searchButton") as HTMLButtonElement;
searchButton!.addEventListener('click', () => reloadTable());


let playersArr : player[] = [];
interface player {
    position: string,
    twoPercent: number,
    threePercent: number,
    points: number,
    playerName: string
}


async function reloadTable() {
    playerTableBody!.innerHTML = "";
    await getPlayersToPlayersArr({
        position: positionSearch.value,
        twoPercent: +twoSearch.value,
        threePercent: +threeSearch.value,
        points: +pointsSearch.value,
    });
    playersArr.forEach((currentPlayer : player)=> {
        const newTr = document.createElement("tr")
        const nameTd = document.createElement("td");
        nameTd.innerText = currentPlayer.playerName;
        const positionTd = document.createElement("td");
        positionTd.innerText = currentPlayer.position;
        const pointsTd = document.createElement("td");
        pointsTd.innerText = currentPlayer.points.toString();
        const threePercentTd = document.createElement("td");
        threePercentTd.innerText = currentPlayer.threePercent.toString();
        const twoPercentTd = document.createElement("td");
        twoPercentTd.innerText = currentPlayer.twoPercent.toString();

        const addPlayerBtn = document.createElement("button");
        addPlayerBtn.innerText = `add player ${currentPlayer.playerName} to current team`;
        addPlayerBtn.addEventListener('click', () => {
            addPlayer(currentPlayer);
        });

        newTr.appendChild(nameTd);
        newTr.appendChild(positionTd);
        newTr.appendChild(pointsTd);
        newTr.appendChild(threePercentTd);
        newTr.appendChild(twoPercentTd);
        newTr.appendChild(addPlayerBtn);
        playerTableBody?.appendChild(newTr);        
    })
    playersArr = [];
}

async function getPlayersToPlayersArr(request : object) {   

    await fetch('https://nbaserver-q21u.onrender.com/api/filter', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    })
    .then(response => response.json())
    .then(data => playersArr.push(...data))
    .then(() => console.log(`המידע נכנס למערך שחקנים`))
    .then(() => console.log(playersArr))
    
    .catch(error => console.error('Error:', error));

}

function addPlayer(currentPlayer: player){
    const playerElement = document.createElement("div");
    playerElement.textContent = `${currentPlayer.playerName} - ${currentPlayer.position}\n ${currentPlayer.points}\n ${currentPlayer.threePercent}%\n ${currentPlayer.twoPercent}%`;
    switch (currentPlayer.position) {
        case "PG":
            
            pointGuardContainer!.innerHTML = '';
            pointGuardContainer?.append(playerElement);
            break;
        case "SG":
            sootingGuardContainer!.innerHTML = '';
            sootingGuardContainer?.append(playerElement);
            break;
        case "SF":
            smallForwardContainer!.innerHTML = '';
            smallForwardContainer?.append(playerElement);
            break;
        case "PF":
            powerForwardContainer!.innerHTML = '';
            powerForwardContainer?.append(playerElement);
            break;
        case "C":
            centerContainer!.innerHTML = '';
            centerContainer?.append(playerElement);
            break;
    }

}
