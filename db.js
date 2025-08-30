const databaseUrl = 'https://docs.google.com/spreadsheets/d/1Q9sTiTxXk10EXDHnAPSloz_Leks8TzqRXCcr7Jv1iYQ/edit?usp=sharing';
const statsDatabaseUrlCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR0Fk_Z9puO0Nix_J9CMWN3M6fUBUSQQHmpC17PBPCM-JhE0yUgZljOAmqYbQhf3I0awcpDF5q1E_qU/pub?gid=0&single=true&output=csv';
const standingsDatabaseUrlCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR0Fk_Z9puO0Nix_J9CMWN3M6fUBUSQQHmpC17PBPCM-JhE0yUgZljOAmqYbQhf3I0awcpDF5q1E_qU/pub?gid=407864060&single=true&output=csv';
const regCSVtoArray = /(?<=,")(.*?)(?=",)|[^,"\n]+|(?<=,)$|^(?=,)|(?<=,)(?=,)/gm; // Jesus Christ either know everything or don't learn it at all..
const regCommandSyntax = /(?<=^\/).*?(?=\s)/;
const regContentAfterCommand = /^\S+\s(.*)/;

