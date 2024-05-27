
document.addEventListener("DOMContentLoaded", () => {
    const teamForm = document.getElementById('team-form');
    const playerForm = document.getElementById('player-form');
    const teamSelect = document.getElementById('team-select');
    const teamList = document.getElementById('team-list');
    const playerList = document.getElementById('player-list');
    const playMatchButton = document.getElementById('play-match');
    const matchResultDiv = document.getElementById('match-result');
    const rankingList = document.getElementById('ranking-list');

    let teams = [];
    let players = [];
    let rankings = [];

    teamForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const teamName = document.getElementById('team-name').value;
        if (teamName && !teams.includes(teamName)) {
            teams.push(teamName);
            rankings[teamName] = 0;
            updateTeamList();
            updateTeamSelect();
        }
        teamForm.reset();
    });

    playerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const playerName = document.getElementById('player-name').value;
        const teamName = document.getElementById('team-select').value;
        if (playerName && teamName) {
            players.push({ name: playerName, team: teamName });
            updatePlayerList();
        }
        playerForm.reset();
    })

    playMatchButton.addEventListener('click', () => {
        if (teams.length < 2) {
            alert(`Need at least 2 teams to play a match`);
            return;
        }

        const team1 = teams[Math.floor(Math.random() * teams.length)];
        let team2;
        do {
            team2 = teams[Math.floor(Math.random() * teams.length)];
        } while (team1 === team2);

        const winner = Math.random() > 0.5 ? team1 : team2;

        rankings[winner]++;
        matchResultDiv.innerHTML = `Match played between ${team1} and ${team2}. Winner: ${winner}`;
        updateRankingList();
    });

    function updateTeamList() {
        teamList.innerHTML = '';
        teams.forEach(team => {
            const li = document.createElement('li');
            li.textContent = team;
            teamList.appendChild(li);
        });
    }

    function updateTeamSelect() {
        teamSelect.innerHTML = '';
        teams.forEach(team => {
            const option = document.createElement('option');
            option.value = team;
            option.textContent = team;
            teamSelect.appendChild(option);
        });
    }

    function updatePlayerList() {
        playerList.innerHTML = '';
        players.forEach(player => {
            const li = document.createElement('li');
            li.textContent = `${player.name} (${player.team})`;
            playerList.appendChild(li);
        });
    }

    function updateRankingList() {
        rankingList.innerHTML = '';
        const sortedTeams = Object.keys(rankings).sort((a, b) => rankings[b] - rankings[a]);
        sortedTeams.forEach(team => {
            const li = document.createElement('li');
            li.textContent = `${team}: ${rankings[team]} wins`;
            rankingList.appendChild(li);
        })
    }
})