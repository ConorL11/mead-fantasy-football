const currentLeagueId = '990427440436625408';
const sleeper2021 = '863906445559795712';
const espnLeagueId = '322485';
const censorContent = 1; // Use this variable to censor non professional content from site
const espnTestApiUrl = 'https://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/322485';

// Old ESPN League URLs https://fantasy.espn.com/football/league/history?leagueId=322485&seasonId=2023
const pastWinners = [
    {year: '2022', platform: 'espn', winningUser: 'Fisher', winningTeam: 'Big Bussin Bouncy Balls', losingUser: 'Cody', losingTeam: 'Just Last', punishment: 'Wore Griffs HS Football Jersey to the draft (kinda).'},
    {year: '2021', platform: 'sleeper', winningUser: 'Rob', winningTeam: 'Unlucky Bastards', losingUser: 'Griff', losingTeam: 'Balerian the Dreadful', punishment: 'Got pelted with eggs'},
    {year: '2020', platform: 'espn', winningUser: 'Desch', winningTeam: 'Pop Drop and Lockett', losingUser: 'Cody', losingTeam: 'I quit', punishment: 'Made an Only Fans (kinda)'},
    {year: '2019', platform: 'espn', winningUser: 'Desch', winningTeam: "Philip Rivers' 10th Kid", losingUser: 'Ryan', losingTeam: 'Back to retirement', punishment: 'Wore a tutu to the draft (kinda)'},
    {year: '2018', platform: 'espn', winningUser: 'Patty', winningTeam: 'The Boobskin', losingUser: 'Fisher', losingTeam: 'Mia Malkova', punishment: 'Had to get frosted tips (but looked good)'},
    {year: '2017', platform: 'espn', winningUser: 'Rob', winningTeam: 'The ToddFather Part 2',  losingUser: 'Thomas', losingTeam: 'Well Darn', punishment: 'Wore a dildo to the FoCo bars'}, 
    {year: '2016', platform: 'espn', winningUser: 'Conor', winningTeam: 'Curb Check', losingUser: 'John Brady', losingTeam: 'At Least Im Not at Wyoming', punishment: 'Did not follow through on head shaving'},
    {year: '2015', platform: 'espn', winningUser: 'Cody', winningTeam: 'LOL Hiroshima',  losingUser: 'Thomas', losingTeam: 'Comeback Time Bitches', punishment: ' Did Standup Comedy'},
    {year: '2014', platform: 'espn', winningUser: 'Ryan', winningTeam: 'The Rylo Show', losingUser: 'Perez', losingTeam: 'FUCK MARSHAWN LYNCH', punishment: 'Got Kicked out of the league'},
];

export {currentLeagueId, sleeper2021, espnLeagueId, censorContent, pastWinners, espnTestApiUrl}