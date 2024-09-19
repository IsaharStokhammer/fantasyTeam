"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const pointGuardContainer = document.getElementById("pointGuardContainer");
const sootingGuardContainer = document.getElementById("shootingGuardContainer");
const smallForwardContainer = document.getElementById("smallForwardContainer");
const powerForwardContainer = document.getElementById("powerForwardContainer");
const centerContainer = document.getElementById("centerContainer");
const playerTableBody = document.getElementById("playerTableBody");
const searchFrom = document.getElementById("searchFrom");
searchFrom.addEventListener("submit", (e) => {
    e.preventDefault();
});
const teamsContainer = document.getElementById("teamsContainer");
const teams = [];
let currentTeam = [];
const positionSearch = document.getElementById("positionSearch");
const pointsSearch = document.getElementById("pointsSearch");
const threeSearch = document.getElementById("3Search");
const twoSearch = document.getElementById("2Search");
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener('click', () => reloadTable());
let playersArr = [];
function reloadTable() {
    return __awaiter(this, void 0, void 0, function* () {
        playerTableBody.innerHTML = "";
        yield getPlayersToPlayersArr({
            position: positionSearch.value,
            twoPercent: +twoSearch.value,
            threePercent: +threeSearch.value,
            points: +pointsSearch.value,
        });
        playersArr.forEach((currentPlayer) => {
            const newTr = createTableRow(currentPlayer);
            playerTableBody === null || playerTableBody === void 0 ? void 0 : playerTableBody.appendChild(newTr);
        });
        function createTableRow(currentPlayer) {
            const newTr = document.createElement("tr");
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
        function createTd(text) {
            const td = document.createElement("td");
            td.innerText = text;
            return td;
        }
        function createAddPlayerButton(currentPlayer) {
            const addPlayerBtn = document.createElement("button");
            const firstName = currentPlayer.playerName.split(" ")[0];
            addPlayerBtn.innerText = `add player ${firstName} to current team`;
            addPlayerBtn.addEventListener('click', () => {
                addPlayer(currentPlayer);
            });
            return addPlayerBtn;
        }
        playersArr = [];
    });
}
function getPlayersToPlayersArr(request) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch('https://nbaserver-q21u.onrender.com/api/filter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
            .then(response => response.json())
            .then(data => playersArr.push(...data))
            .catch(error => console.error('Error:', error));
    });
}
function addPlayer(currentPlayer) {
    const playerElement = document.createElement("div");
    const playerDetails = document.createElement("p");
    playerDetails.innerText = `${currentPlayer.playerName} - ${currentPlayer.position}\n  points: ${currentPlayer.points}\n 3: ${currentPlayer.threePercent}%\n 2 :${currentPlayer.twoPercent}%`;
    playerElement.appendChild(playerDetails);
    currentTeam = [];
    switch (currentPlayer.position) {
        case "PG":
            pointGuardContainer.innerHTML = '';
            pointGuardContainer === null || pointGuardContainer === void 0 ? void 0 : pointGuardContainer.append(playerElement);
            currentTeam.push(currentPlayer);
            teams.push(currentTeam);
            break;
        case "SG":
            sootingGuardContainer.innerHTML = '';
            sootingGuardContainer === null || sootingGuardContainer === void 0 ? void 0 : sootingGuardContainer.append(playerElement);
            currentTeam.push(currentPlayer);
            teams.push(currentTeam);
            break;
        case "SF":
            smallForwardContainer.innerHTML = '';
            smallForwardContainer === null || smallForwardContainer === void 0 ? void 0 : smallForwardContainer.append(playerElement);
            currentTeam.push(currentPlayer);
            teams.push(currentTeam);
            break;
        case "PF":
            powerForwardContainer.innerHTML = '';
            powerForwardContainer === null || powerForwardContainer === void 0 ? void 0 : powerForwardContainer.append(playerElement);
            currentTeam.push(currentPlayer);
            teams.push(currentTeam);
            break;
        case "C":
            centerContainer.innerHTML = '';
            centerContainer === null || centerContainer === void 0 ? void 0 : centerContainer.append(playerElement);
            currentTeam.push(currentPlayer);
            teams.push(currentTeam);
            break;
    }
}
const getAllPlayersBtn = document.getElementById("getAllPlayersBtn");
getAllPlayersBtn === null || getAllPlayersBtn === void 0 ? void 0 : getAllPlayersBtn.addEventListener('click', () => getAllTeams());
function saveTeamToDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonObj = JSON.stringify(currentTeam);
        yield fetch('https://nbaserver-q21u.onrender.com/api/addTeam', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: `{players:[${jsonObj}]}`
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    });
}
function getAllTeams() {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch('https://nbaserver-q21u.onrender.com/api/GETAllTeams')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    });
}
