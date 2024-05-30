document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const team1 = urlParams.get('team1');
    const team2 = urlParams.get('team2');

    if (!team1 || !team2) {
        alert('Invalid teams selected.');
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('team-names').textContent = `${team1} vs ${team2}`;
    document.getElementById('team1-name').textContent = team1;
    document.getElementById('team2-name').textContent = team2;

    let team1Runs = 0;
    let team2Runs = 0;

    window.addRun = function (team) {
        if (team === 'team1') {
            team1Runs++;
            document.getElementById('team1-runs').textContent = team1Runs;
        } else if (team === 'team2') {
            team2Runs++;
            document.getElementById('team2-runs').textContent = team2Runs;
        }
    };

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

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    };
});