document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);

    console.log("hello");
    console.log(urlParams);

    const team1 = urlParams.get('team1');
    const team2 = urlParams.get('team2');

    console.log(team1);
    console.log(team2);

    if (!team1 || !team2) {
        alert('Invalid teams selected.');
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('team-names').textContent = `${team1} vs ${team2}`;
    document.getElementById('team1-name').textContent = team1;
    document.getElementById('team2-name').textContent = team2;

    let team1Runs = 0;
    let team1Balls = 0;
    let team1Overs = 0;
    let team2Runs = 0;
    let team2Balls = 0;
    let team2Overs = 0;
    let currentTeam = '';

    window.addRun = function (team, runs) {
        if (team === 'team1') {
            team1Runs += runs;
            team1Balls++;
            if (team1Balls === 6) {
                team1Overs++;
                team1Balls = 0;
            }
            document.getElementById('team1-runs').textContent = team1Runs;
            document.getElementById('team1-overs').textContent = `${team1Overs}.${team1Balls}`;
        } else if (team === 'team2') {
            team2Runs += runs;
            team2Balls++;
            if (team2Balls === 6) {
                team2Overs++;
                team2Balls = 0;
            }
            document.getElementById('team2-runs').textContent = team2Runs;
            document.getElementById('team2-overs').textContent = `${team1Overs}.${team1Balls}`;
        }
    };

    window.showWicketOptions = function (team) {
        currentTeam = team;
        document.getElementById('wicket-section').style.display = 'block';
    }

    window.addWicket = function () {
        const wicketType = document.getElementById('wicket-type').value;
        if (currentTeam === 'team1') {
            team1Balls++;
            if (team1Balls === 6) {
                team1Overs++;
                team1Balls = 0;
            }
            document.getElementById('team1-overs').textContent = `${team1Overs}.${team1Balls}`;
        } else if (currentTeam === 'team2') {
            team2Balls++;
            if (team2Balls === 6) {
                team2Overs++;
                team2Balls = 0;
            }
            document.getElementById('team2-overs').textContent = `${team2Overs}.${team2Balls}`;
        }
        alert(`${currentTeam} wicket: ${wicketType}`);
        document.getElementById('wicket-section').style.display = 'none';
    }

    window.endMatch = function () {
        let result;
        if (team1Runs > team2Runs) {
            result = `${team1} wins!`;
        } else if (team2Runs > team1Runs) {
            result = `${team2} wins!`;
        } else {
            result = 'It\'s a tie!';
        }

        document.getElementById('match-result').textContent = result;

        // Update rankings
        const rankings = JSON.parse(localStorage.getItem('rankings')) || {};
        if (result.includes(team1)) {
            rankings[team1] = (rankings[team1] || 0) + 1;
        } else if (result.includes(teams2)) {
            rankings[team2] = (rankings[team2] || 0) + 1;
        }
        localStorage.setItem('rankings', JSON.stringify(rankings));

        // Redirect back to the main page after a delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    };
});