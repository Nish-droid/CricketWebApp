
document.addEventListener("DOMContentLoaded", () => {
    const teamForm = document.getElementById('team-form');
    const playerForm = document.getElementById('player-form');
    const teamSelect = document.getElementById('team-select');
    const teamList = document.getElementById('team-list');
    const playerList = document.getElementById('player-list');
    const matchForm = document.getElementById('match-form');
    const team1Select = document.getElementById('team1-select');
    const team2Select = document.getElementById('team2-select');
    // const matchResultDiv = document.getElementById('match-result');
    const rankingList = document.getElementById('ranking-list');

    let teams = [];
    let players = [];
    let rankings = [];

    teamForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const teamName = document.getElementById('team-name').value.trim();
        if (teamName && !teams.includes(teamName)) {
            teams.push(teamName);
            rankings[teamName] = 0;
            updateTeamList();
            updateTeamSelects();
        } else {
            alert('Team name is either empty or already exists');
        }
        teamForm.reset();
    });

    playerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const playerName = document.getElementById('player-name').value.trim();
        const teamName = document.getElementById('team-select').value;
        if (playerName && teamName && !players.some(player => player.name === playerName)) {
            players.push({ name: playerName, team: teamName });
            updatePlayerList();
        } else {
            alert('Player name is either empty or already exists');
        }
        playerForm.reset();
    })

    matchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const team1 = document.getElementById('team1-select').value;
        const team2 = document.getElementById('team2-select').value;
        if (team1 && team2 && team1 !== team2) {
            // Redirect to match page with selected teams as URL params
            window.location.href = `match.html?team1=${encodeURIComponent(team1)}&team2=${encodeURIComponent(team2)}`;
            // const winner = Math.random() > 0.5 ? team1 : team2;
            // rankings[winner]++;
            // matchResultDiv.innerHTML = `Match played between ${team1} and ${team2}. Winner: ${winner}`;
            // updateRankingList();
        } else {
            alert('Please select two different teams');
        }
    });

    function updateTeamList() {
        teamList.innerHTML = '';
        teams.forEach(team => {
            const li = document.createElement('li');
            li.textContent = team;
            teamList.appendChild(li);
        });
    }

    function updateTeamSelects() {
        teamSelect.innerHTML = '';
        team1Select.innerHTML = '';
        team2Select.innerHTML = '';

        teams.forEach(team => {
            const option = document.createElement('option');
            option.value = team;
            option.textContent = team;
            teamSelect.appendChild(option);

            const option1 = option.cloneNode(true);
            team1Select.appendChild(option1);

            const option2 = option.cloneNode(true);
            team2Select.appendChild(option2);
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