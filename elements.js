// DISCORD URL IS HERE!!!!1!1!
const discordUrl = 'https://discord.gg/rxszbmu9';


function showPage(page) {
  for (const key in pages) {
    pages[key].classList.add('hidden')
  }
  pages[page].classList.remove('hidden')
}


const statsSearchBar = document.getElementById('stats-search-bar');
const standingsSearchBar = document.getElementById('standings-search-bar');
const searchIcon = document.getElementById('search-icon');
const standingsSearchIcon = document.getElementById('standings-icon');

const pages = {
  // Put all pages here for navbar to open/close
  home: document.getElementById('home-page'),
  standings: document.getElementById('standings-page'),
  stats: document.getElementById('stats-page')
}

const sidebarNav = document.getElementById('sidebar-nav');
const openSidebarNav = document.getElementById('nav_hamburger');
const closeSidebarNav = document.getElementById('sidebar-nav_close');
const sidebarNavHome = document.getElementById('sidebar-nav_home');
const sidebarNavStandings = document.getElementById('sidebar-nav_standings');
const sidebarNavStats = document.getElementById('sidebar-nav_stats');

const tableContainer = document.getElementById('stats-table-container');
const standingsTableContainer = document.getElementById('standings-table-container');

// Assign event listeners to nav links
document.getElementById('nav_home').addEventListener('click', () => showPage('home'));
document.getElementById('nav_standings').addEventListener('click', () => showPage('standings'));
document.getElementById('nav_stats').addEventListener('click', () => showPage('stats'));

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
  if (statsSearchBar.value === '') return console.log('Search Bar is empty');
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