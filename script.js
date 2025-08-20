const discordUrl = 'https://discord.gg/rxszbmu9';
const databaseUrl = 'https://docs.google.com/spreadsheets/d/1Q9sTiTxXk10EXDHnAPSloz_Leks8TzqRXCcr7Jv1iYQ/edit?usp=sharing';
const databaseUrlCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR0Fk_Z9puO0Nix_J9CMWN3M6fUBUSQQHmpC17PBPCM-JhE0yUgZljOAmqYbQhf3I0awcpDF5q1E_qU/pub?gid=0&single=true&output=csv';
const standingsDatabaseUrlCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR0Fk_Z9puO0Nix_J9CMWN3M6fUBUSQQHmpC17PBPCM-JhE0yUgZljOAmqYbQhf3I0awcpDF5q1E_qU/pub?gid=407864060&single=true&output=csv';
const regCSVtoArray = /(?<=,")(.*?)(?=",)|[^,"\n]+|(?<=,)$|^(?=,)|(?<=,)(?=,)/gm; // Jesus Christ either know everything or don't learn it at all..
const regCommandSyntax = /(?<=^\/).*?(?=\s)/;
const regContentAfterCommand = /^\S+\s(.*)/;

const pages = {
  home: document.getElementById('home-page'),
  standings: document.getElementById('standings-page'),
  stats: document.getElementById('stats-page')
}

const searchBar = document.getElementById('stats-search-bar');
const standingsSearchBar = document.getElementById('standings-search-bar');
const searchIcon = document.getElementById('search-icon');
const standingsSearchIcon = document.getElementById('standings-icon');

function showPage(page) {
  for (const key in pages) {
    pages[key].classList.add('hidden')
  }
  pages[page].classList.remove('hidden')
}

// Assign event listeners to nav links
document.getElementById('nav_home').addEventListener('click', () => showPage('home'));
document.getElementById('nav_standings').addEventListener('click', () => showPage('standings'));
document.getElementById('nav_stats').addEventListener('click', () => showPage('stats'));

// Sidebar Nav
const sidebarNav = document.getElementById('sidebar-nav');
const openSidebarNav = document.getElementById('nav_hamburger');
const closeSidebarNav = document.getElementById('sidebar-nav_close');
const sidebarNavHome = document.getElementById('sidebar-nav_home');
const sidebarNavStandings = document.getElementById('sidebar-nav_standings');
const sidebarNavStats = document.getElementById('sidebar-nav_stats');

openSidebarNav.addEventListener('click', () => {
  sidebarNav.classList.remove('hidden');
})
closeSidebarNav.addEventListener('click', () => {
  sidebarNav.classList.add('hidden');
})
sidebarNavHome.addEventListener('click', () => {
  sidebarNav.classList.add('hidden');
  showPage('home');
})
sidebarNavStandings.addEventListener('click', () => {
  sidebarNav.classList.add('hidden');
  showPage('standings');
})
sidebarNavStats.addEventListener('click', () => {
  sidebarNav.classList.add('hidden');
  showPage('stats');
})

// Assign event listeners to discord button
document.querySelector('.discord-button').addEventListener('click', () => {
  window.open(discordUrl, '_blank');
})

// Event Listener for search bar
searchIcon.disabled = false;
searchIcon.addEventListener('click', () => {
  console.log('Search Icon Clicked')
  if (searchBar.value === '') return console.log('Search Bar is empty');
  if (searchIcon.disabled === false) {
    console.log('Search Icon is enabled')
    updateStats();
  } else {
    console.log('Search Icon is disabled')
  }
})
standingsSearchIcon.disabled = false;
standingsSearchIcon.addEventListener('click', () => {
  console.log('Search Icon Clicked')
  if (standingsSearchBar.value === '') return console.log('Search Bar is empty');
  if (searchIcon.disabled === false) {
    console.log('Search Icon is enabled')
    updateStandings();
  } else {
    console.log('Search Icon is disabled')
  }
})

// Back-end
const tableContainer = document.getElementById('stats-table-container');
const standingsTableContainer = document.getElementById('standings-table-container');
async function getAllData() {
  return fetch(databaseUrlCSV, { cache: "no-store" })
    .then(response => response.text())
    .then(data => {
      console.log(data)
      data = data.trim().split(/\r?\n/).map(row => row.match(regCSVtoArray));
      console.log(data);
      return data;
    })
}

async function getAllStandingsData() {
  return fetch(standingsDatabaseUrlCSV, { cache: "no-store" })
    .then(response => response.text())
    .then(data => {
      // console.log(data)
      data = data.trim().split(/\r?\n/).map(row => row.match(regCSVtoArray));
      // console.log(data);
      return data;
    })
}

function selectCell(column, row) {
  return data[row][column];
}

async function updateStats() {
  // Disable search button
  console.log('search icon is disabled')
  searchIcon.disabled = true;
  // Empty the table container
  tableContainer.innerHTML = '';
  const userSearch = String(searchBar.value);
  const data = await getAllData();
  const columns = data[0].length;
  const rows = data.length;
  console.log(String(columns) + 'x' + String(rows))

  const headerStyleArray = ['bg-blue', 'bg-blue', 'bg-yellow', 'bg-green', 'bg-red', 'bg-green', 'bg-green', 'bg-green', 'bg-green', 'bg-blue']
  const cellStyleArray = ['bg-blue-lighter', 'bg-blue-lighter', 'bg-yellow-lighter', 'bg-green-lighter', 'bg-red-lighter', 'bg-green-lighter', 'bg-green-lighter', 'bg-green-lighter', 'bg-green-lighter', 'bg-blue-lighter']

  const table = document.createElement('table');
  // Generate table based on search value
  const headerRow = document.createElement('tr');
  for (let i = 0; i < columns; i++) {
    const headerCell = document.createElement('th');
    headerCell.textContent = data[0][i];
    headerCell.classList.add(headerStyleArray[i]);
    headerRow.appendChild(headerCell);
    // console.log('created header cell:' + data[0][i])
  }
  table.appendChild(headerRow);
  // console.log('created header row')
  // console.log('search value!' + userSearch)
  for (let i = 1; i < rows; i++) {
    // console.log('checking row:' + i + ' with name ' + data[i][0])
    let tempBool = data[i][0].toLowerCase().includes(userSearch.toLowerCase())
    // console.log('match: ' + tempBool)
    if (tempBool) {
      // console.log('found match:' + data[i][0])
      const row = document.createElement('tr');
      for (let j = 0; j < columns; j++) {
        const cell = document.createElement('td');
        cell.textContent = data[i][j];
        cell.classList.add(cellStyleArray[j]);
        // console.log('created cell:' + data[i][j])
        row.appendChild(cell);
        table.appendChild(row);
        // console.log('created row')
      }
    }
  }
  tableContainer.appendChild(table);
  // Enable search button
  console.log('search icon is re-enabled')
  searchIcon.disabled = false;
}

async function updateStandings() {
  // Disable search button
  // console.log('search icon is disabled')
  standingsSearchIcon.disabled = true;
  // Empty the table container
  standingsTableContainer.innerHTML = '';
  const userSearch = String(searchBar.value);
  const data = await getAllStandingsData();
  // console.log(data);
  const columns = data[0].length;
  const rows = data.length;
  // Process the data based on syntax: separate when there is /new-division
  const dataSeparatedByDivision = [];
  const dataOfOneDivision = []; // Collect data of a full division before pushing to dataSeparatedByDivision and empty itself for the next division
  let firstNewDivision = true;
  for (let i = 0; i < rows; i++) {
    // console.log('Running at row ' + i);
    // console.log('First column content: ' + data[i][0])
    let command = data[i][0].match(regCommandSyntax) ? data[i][0].match(regCommandSyntax)[0] : null;
    if (command) {
      // console.log('Command detected: ' + command);
    } else {
      // console.log('No command detected');
    }
    if (command === 'new-division') {
      if (firstNewDivision === true) {
        firstNewDivision = false;
        // console.log('This is the first division created, skipped pushing to dataSeparatedByDivision')
      } else {
        dataSeparatedByDivision.push(dataOfOneDivision);
        // console.log('Full division created: ', dataOfOneDivision)
      }
      dataOfOneDivision.length = 0;
      // console.log("RegExp!important: ", data[i][0].match(regContentAfterCommand));
      // console.log(data[i][0].match(regContentAfterCommand)[1]);
      let divisionNameInAnArray = [data[i][0].match(regContentAfterCommand)[1]];
      dataOfOneDivision.push(divisionNameInAnArray);
      // console.log('Division name: ' + divisionNameInAnArray[0]);
    } else if (command == 'end') {
      dataSeparatedByDivision.push(dataOfOneDivision);
      // console.log('Processing ended, created last division: ', dataOfOneDivision);
      break;
    } else {
      dataOfOneDivision.push(data[i]);
      // console.log('Pushed row ' + i + ' to dataOfOneDivision: ', data[i]);
    }    
  }
  console.log('Result: ', JSON.stringify(dataSeparatedByDivision))
  // console.log('');

  
  // Filter result based on search value
  let filteredData = structuredClone(dataSeparatedByDivision);
  // console.log('Filtered result: ', JSON.stringify(filteredData));
  let filteredDataOfOneDivision = [];
  if (userSearch !== '') {
    // console.log('User search is not empty: ' + userSearch)
    filteredData.length = 0;
    // console.log('Filtered result: ', JSON.stringify(filteredData));
    for (let division = 0; division < dataSeparatedByDivision.length; division++) {
      // console.log('Running at division ' + division + ' with name ' + dataSeparatedByDivision[division][0][0] + ' and length ' + dataSeparatedByDivision[division].length);
      let isDivisionCreated = false;
      filteredDataOfOneDivision.length = 0;
      for (let row = 2; row < dataSeparatedByDivision[division].length; row++) {
        // console.log('Running at row ' + row + ' with Team name ' + dataSeparatedByDivision[division][row][0]);
        if (dataSeparatedByDivision[division][row][0].toLowerCase().includes(userSearch.toLowerCase())) {
          // console.log('Found match: ' + dataSeparatedByDivision[division][row][0] + " matches user's search " + userSearch);
          if (!isDivisionCreated) {
            // console.log('Division is not created, creating division: ' + dataSeparatedByDivision[division][0][0])
          filteredDataOfOneDivision.push([dataSeparatedByDivision[division][0][0]]);
            // console.log('Pushed Team Name: ', dataSeparatedByDivision[division][0][0]);
            // console.log('Filtered result: ', JSON.stringify(filteredData));
            
          filteredDataOfOneDivision.push([dataSeparatedByDivision[division][1]]);
            // console.log('Pushed Heading Row: ', dataSeparatedByDivision[division][1]);
            isDivisionCreated = true;
            // console.log('Filtered result: ', JSON.stringify(filteredData));
          }
          filteredDataOfOneDivision.push([dataSeparatedByDivision[division][row]])
          // console.log('Pushed row ' + row + ' to filteredDataOfOneDivision: ', dataSeparatedByDivision[division][row])
          // console.log('Filtered result: ', JSON.stringify(filteredData));
        }
      }
      // console.log('Division fully filtered, result: ', filteredDataOfOneDivision)
      filteredData.push(filteredDataOfOneDivision)
      // console.log('Filtered result: ', JSON.stringify(filteredData));
    }
  }
  console.log('Filtered result: ', JSON.stringify(filteredData));

  // Generate tableS based on filtered result

  for (let division = 0; division < filteredData.length; division++) {
    console.log('Running at division ' + division + ' with name ' + filteredData[division][0][0] + ' and length ' + filteredData[division].length);
    let divisionName = filteredData[division][0][0];
    console.log('Create new division: ', divisionName);
    const divisionContainer = document.createElement('div');
    divisionContainer.classList.add('standings-division-container');
    const divisionNameElement = document.createElement('h2');
    divisionNameElement.textContent = divisionName;
    divisionContainer.appendChild(divisionNameElement);
    const table = document.createElement('table');
    for (let row = 1; row < filteredData[division].length; row++) {
      console.log('Running at row ' + row + ' with Team name ' + filteredData[division][row][0]);
      const tableRow = document.createElement('tr');
      for (let column = 0; column < filteredData[division][row].length; column++) {
        console.log('Running at column ' + column + ' with content ' + filteredData[division][row][column]);
        const tableCell = document.createElement('td');
        tableCell.textContent = filteredData[division][row][column];
        tableRow.appendChild(tableCell);
      }
      table.appendChild(tableRow);
    }
    divisionContainer.appendChild(table);
    standingsTableContainer.appendChild(divisionContainer);
  }
}

updateStats()
updateStandings()
setTimeout(console.log(pages.stats), 7000)