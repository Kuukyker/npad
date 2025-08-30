const discordUrl = 'https://discord.gg/rxszbmu9';
const databaseUrl = 'https://docs.google.com/spreadsheets/d/1Q9sTiTxXk10EXDHnAPSloz_Leks8TzqRXCcr7Jv1iYQ/edit?usp=sharing';
const statsDatabaseUrlCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR0Fk_Z9puO0Nix_J9CMWN3M6fUBUSQQHmpC17PBPCM-JhE0yUgZljOAmqYbQhf3I0awcpDF5q1E_qU/pub?gid=0&single=true&output=csv';
const standingsDatabaseUrlCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR0Fk_Z9puO0Nix_J9CMWN3M6fUBUSQQHmpC17PBPCM-JhE0yUgZljOAmqYbQhf3I0awcpDF5q1E_qU/pub?gid=407864060&single=true&output=csv';
const regCSVtoArray = /(?<=,")(.*?)(?=",)|[^,"\n]+|(?<=,)$|^(?=,)|(?<=,)(?=,)/gm; // Jesus Christ either know everything or don't learn it at all..
const regCommandSyntax = /(?<=^\/).*?(?=\s)/;
const regContentAfterCommand = /^\S+\s(.*)/;


// Back-end
async function fetchCSVData(url) {
  return fetch(url, { cache: "no-store" })
  .then(response => response.text())
  .then(data => {
    console.log(data);
    data = data.trim().split(/\r?\n/).map(row => row.match(regCSVtoArray));
    return data;
  })
}

function generateTableBasedOnData(type, data, container) {
  if (type == 'stats') {}
  if (type == 'standings') {}
}

async function updateStats() {
  searchIcon.disabled = true;
  tableContainer.innerHTML = '';
  
  const searchValue = String(statsSearchBar.value);
  const data = await fetchCSVData(statsDatabaseUrlCSV);
  const columns = data[0].length;
  const rows = data.length;

  const table = document.createElement('table');
  
  // Generate table based on search value
  const headerRow = document.createElement('tr');
  
  for (let i = 0; i < columns; i++) {
    const headerCell = document.createElement('th');
    headerCell.textContent = data[0][i];
    headerRow.appendChild(headerCell);
  }
  
  table.appendChild(headerRow);

  for (let i = 1; i < rows; i++) {
    let tempBool = data[i][0].toLowerCase().includes(searchValue.toLowerCase())
    if (tempBool) {
      const row = document.createElement('tr');
      for (let j = 0; j < columns; j++) {
        const cell = document.createElement('td');
        cell.textContent = data[i][j];
        row.appendChild(cell);
        table.appendChild(row);
      }
    }
  }
  tableContainer.appendChild(table);
  searchIcon.disabled = false;
}

async function updateStandings() {
  // Disable search button
  // console.log('search icon is disabled')
  standingsSearchIcon.disabled = true;
  // Empty the table container
  standingsTableContainer.innerHTML = '';
  const searchValue = String(statsSearchBar.value);
  const data = await fetchCSVData(standingsDatabaseUrlCSV);
  // console.log('Fetched: ', data);
  const columns = data[0].length;
  const rows = data.length;
  // Process the data based on syntax: separate when there is /new-division
  const dataSeparatedByDivision = [];
  const dataOfOneDivision = []; // Collect data of a full division before pushing to dataSeparatedByDivision and empty itself for the next division
  let firstNewDivision = true;
  console.log('Current dataOfOneDivision: ', structuredClone(dataOfOneDivision));
  for (let i = 0; i < rows; i++) {
    console.log('Running at row ' + i);
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
        dataSeparatedByDivision.push(structuredClone(dataOfOneDivision));
        console.log('Full division created: ', structuredClone(dataOfOneDivision))
      }
      dataOfOneDivision.length = 0;
      // console.log("RegExp!important: ", data[i][0].match(regContentAfterCommand));
      // console.log(data[i][0].match(regContentAfterCommand)[1]);
      let divisionNameInAnArray = [data[i][0].match(regContentAfterCommand)[1]];
      dataOfOneDivision.push(structuredClone(divisionNameInAnArray));
      console.log('Division name: ' + divisionNameInAnArray[0]);
      console.log('Pushed division name to dataOfOneDivision: ', structuredClone(divisionNameInAnArray))
    } else if (command == 'end') {
      dataSeparatedByDivision.push(structuredClone(dataOfOneDivision));
      console.log('Processing ended, created last division: ', structuredClone(dataOfOneDivision));
      break;
    } else {
      dataOfOneDivision.push(structuredClone(data[i]));
      console.log('Pushed row ' + i + ' to dataOfOneDivision: ', structuredClone(data[i]));
      console.log('Current dataOfOneDivision: ', structuredClone(dataOfOneDivision));
    }    
  }
  console.log('Result: ', structuredClone(dataSeparatedByDivision))
  // console.log('----------------------------------------------------------------', dataSeparatedByDivision)
  // console.log('');






  
  // Filter result based on search value
  let filteredData = structuredClone(dataSeparatedByDivision);
  // console.log('Filtered result: ', JSON.stringify(filteredData));
  // console.log('DEEEEEEEP CLONED: ', JSON.stringify(filteredData))
  let filteredDataOfOneDivision = [];
  if (searchValue !== '') {
    // console.log('User search is not empty: ' + searchValue)
    filteredData.length = 0;
    // console.log('Filtered result: ', JSON.stringify(filteredData));
    for (let division = 0; division < dataSeparatedByDivision.length; division++) {
      // console.log('Running at division ' + division + ' with name ' + dataSeparatedByDivision[division][0][0] + ' and length ' + dataSeparatedByDivision[division].length);
      let isDivisionCreated = false;
      filteredDataOfOneDivision.length = 0;
      for (let row = 2; row < dataSeparatedByDivision[division].length; row++) {
        // console.log('Running at row ' + row + ' with Team name ' + dataSeparatedByDivision[division][row][0]);
        if (dataSeparatedByDivision[division][row][0].toLowerCase().includes(searchValue.toLowerCase())) {
          // console.log('Found match: ' + dataSeparatedByDivision[division][row][0] + " matches user's search " + searchValue);
          if (!isDivisionCreated) {
            // console.log('Division is not created, creating division: ' + dataSeparatedByDivision[division][0][0])
          filteredDataOfOneDivision.push([structuredClone(dataSeparatedByDivision[division][0][0])]);
            // console.log('Pushed Team Name: ', dataSeparatedByDivision[division][0][0]);
            // console.log('Filtered result: ', JSON.stringify(filteredData));
            
          filteredDataOfOneDivision.push([structuredClone(dataSeparatedByDivision[division][1])]);
            // console.log('Pushed Heading Row: ', dataSeparatedByDivision[division][1]);
            isDivisionCreated = true;
            // console.log('Filtered result: ', JSON.stringify(filteredData));
          }
          filteredDataOfOneDivision.push([structuredClone(dataSeparatedByDivision[division][row])])
          // console.log('Pushed row ' + row + ' to filteredDataOfOneDivision: ', dataSeparatedByDivision[division][row])
          // console.log('Filtered result: ', JSON.stringify(filteredData));
        }
      }
      // console.log('Division fully filtered, result: ', filteredDataOfOneDivision)
      filteredData.push(structuredClone(filteredDataOfOneDivision))
      // console.log('Filtered result: ', JSON.stringify(filteredData));
    }
  }
  // console.log('Filtered result: ', JSON.stringify(filteredData));

  // Generate tableS based on filtered result

  for (let division = 0; division < filteredData.length; division++) {
    // console.log('Running at division ' + division + ' with name ' + filteredData[division][0][0] + ' and length ' + filteredData[division].length);
    let divisionName = filteredData[division][0][0];
    // console.log('Create new division: ', divisionName);
    const divisionContainer = document.createElement('div');
    divisionContainer.classList.add('standings-division-container');
    const divisionNameElement = document.createElement('h2');
    divisionNameElement.textContent = divisionName;
    divisionContainer.appendChild(divisionNameElement);
    const table = document.createElement('table');
    for (let row = 1; row < filteredData[division].length; row++) {
      // console.log('Running at row ' + row + ' with Team name ' + filteredData[division][row][0]);
      const tableRow = document.createElement('tr');
      for (let column = 0; column < filteredData[division][row].length; column++) {
        // console.log('Running at column ' + column + ' with content ' + filteredData[division][row][column]);
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