const pointGuardContainer = document.getElementById("pointGuardContainer");
const sootingGuardContainer = document.getElementById("shootingGuardContainer");
const smallForwardContainer = document.getElementById("smallForwardContainer");
const powerForwardContainer = document.getElementById("powerForwardContainer");
const centerContainer = document.getElementById("centerContainer");
const playerTableBody = document.getElementById("playerTableBody");
const searchFrom = document.getElementById("searchFrom");
searchFrom!.addEventListener("submit",(e:Event)=>{
    e.preventDefault();
});
const teamsContainer = document.getElementById("teamsContainer");

const teams :object[]= [];
let currentTeam : object[] = [];


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
        const newTr = createTableRow(currentPlayer);
        playerTableBody?.appendChild(newTr);
    })

    function createTableRow(currentPlayer : player){
        const newTr = document.createElement("tr")
        const nameTd = createTd(currentPlayer.playerName);
        const positionTd = createTd(currentPlayer.position);
        const pointsTd = createTd(currentPlayer.points.toString());
        const threePercentTd = createTd(currentPlayer.threePercent.toString());
        const twoPercentTd = createTd(currentPlayer.twoPercent.toString());

        const addPlayerBtn = createAddPlayerButton(currentPlayer);
        newTr.appendChild(nameTd);
        newTr.appendChild(positionTd);
        newTr.appendChild(pointsTd);
        newTr.appendChild(threePercentTd);
        newTr.appendChild(twoPercentTd);
        newTr.appendChild(addPlayerBtn);
        return newTr;
    }

    function createTd(text : string){
        const td = document.createElement("td");
        td.innerText = text;
        return td;
    }

    function createAddPlayerButton(currentPlayer : player){
        const addPlayerBtn = document.createElement("button");
        const firstName = currentPlayer.playerName.split(" ")[0];
        addPlayerBtn.innerText = `add player ${firstName} to current team`;
        addPlayerBtn.addEventListener('click', () => {
            addPlayer(currentPlayer);
        });
        return addPlayerBtn;
    }
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
    
    .catch(error => console.error('Error:', error));

}

function addPlayer(currentPlayer: player){
    const playerElement = document.createElement("div");
    const playerDetails = document.createElement("p");
    playerDetails.innerText = `${currentPlayer.playerName} - ${currentPlayer.position}\n  points: ${currentPlayer.points}\n 3: ${currentPlayer.threePercent}%\n 2 :${currentPlayer.twoPercent}%`;
    playerElement.appendChild(playerDetails);
    currentTeam = [];
    switch (currentPlayer.position) {
        
        case "PG":            
            pointGuardContainer!.innerHTML = '';
            pointGuardContainer?.append(playerElement);
            currentTeam.push(currentPlayer);
            teams.push(currentTeam);
            break;
        case "SG":
            sootingGuardContainer!.innerHTML = '';
            sootingGuardContainer?.append(playerElement);
            currentTeam.push(currentPlayer);
            teams.push(currentTeam);
            break;
        case "SF":
            smallForwardContainer!.innerHTML = '';
            smallForwardContainer?.append(playerElement);
            currentTeam.push(currentPlayer);
            teams.push(currentTeam);
            break;
        case "PF":
            powerForwardContainer!.innerHTML = '';
            powerForwardContainer?.append(playerElement);
            currentTeam.push(currentPlayer);
            teams.push(currentTeam);
            break;
        case "C":
            centerContainer!.innerHTML = '';
            centerContainer?.append(playerElement);
            currentTeam.push(currentPlayer);
            teams.push(currentTeam);
            break;
    }

}

const getAllPlayersBtn = document.getElementById("getAllPlayersBtn") as HTMLButtonElement;
getAllPlayersBtn?.addEventListener('click', () => getAllTeams());

async function saveTeamToDB(){
    const jsonObj = JSON.stringify(currentTeam)
    await fetch('https://nbaserver-q21u.onrender.com/api/addTeam', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: `{players:[${jsonObj}]}`
    })
    .then(response => response.json())
    .then(data => console.log(data))    
    .catch(error => console.error('Error:', error));
}

async function getAllTeams() {
    await fetch('https://nbaserver-q21u.onrender.com/api/GETAllTeams')
    .then(response => response.json())
    .then(data => console.log(data))    
    .catch(error => console.error('Error:', error));
}
