const pointGuardContainer = document.getElementById("pointGuardContainer");
const sootingGuardContainer = document.getElementById("shootingGuardContainer");
const smallForwardContainer = document.getElementById("smallForwardContainer");
const powerForwardContainer = document.getElementById("powerForwardContainer");
const centerContainer = document.getElementById("centerContainer");

const playerTableBody = document.getElementById("playerTableBody");

const positionSearch = document.getElementById("positionSearch") as HTMLFormElement;
const pointsSearch = document.getElementById("pointsSearch") as HTMLFormElement;
const threeSearch = document.getElementById("3Search") as HTMLFormElement;
const twoSearch = document.getElementById("2Search") as HTMLFormElement;

const searchButton = document.getElementById("searchButton");

interface player {
    position: string,
    twoPercent: number,
    threePercent: number,
    points: number
}

const request = {
    position: positionSearch.value,
    twoPercent: +twoSearch.value,
    threePercent: +threeSearch.value,
    points: +pointsSearch.value,
}
console.log(request)

fetch('https://nbaserver-q21u.onrender.com/api/filter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));


  
