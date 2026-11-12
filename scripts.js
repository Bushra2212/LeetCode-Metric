
document.addEventListener("DOMContentLoaded", function () {

    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");

    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");

    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");

    const cardStatsContainer = document.querySelector(".stats-card");


    // Validate username
    function validateUsername(username) {

        if (username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }

        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);

        if (!isMatching) {
            alert("Invalid Username");
        }

        return isMatching;
    }


    // Fetch user details
    async function fetchUserDetails(username) {

        const url = `https://leetcode-stats.tashif.codes/${username}`;

        try {

            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Unable to fetch user details");
            }

            const data = await response.json();

            console.log("Logging data:", data);

            if (data.status === "error") {
                throw new Error("Username not found");
            }

            // Extract metrics
            const totalSolved = data.totalSolved;
            const totalQuestions = data.totalQuestions;

            const easySolved = data.easySolved;
            const mediumSolved = data.mediumSolved;
            const hardSolved = data.hardSolved;

            const easyTotal = data.totalEasy;
            const mediumTotal = data.totalMedium;
            const hardTotal = data.totalHard;

            const acceptanceRate = data.acceptanceRate;
            const ranking = data.ranking;


            // Update labels
            easyLabel.textContent = `${easySolved}/${easyTotal}`;

            mediumLabel.textContent = `${mediumSolved}/${mediumTotal}`;

            hardLabel.textContent = `${hardSolved}/${hardTotal}`;


            // Calculate progress percentages
            const easyProgress = easyTotal > 0
                ? (easySolved / easyTotal) * 100
                : 0;

            const mediumProgress = mediumTotal > 0
                ? (mediumSolved / mediumTotal) * 100
                : 0;

            const hardProgress = hardTotal > 0
                ? (hardSolved / hardTotal) * 100
                : 0;


            // Update progress circles
            easyProgressCircle.style.background =
                `conic-gradient(#22c55e ${easyProgress}%, #ededed 0%)`;

            mediumProgressCircle.style.background =
                `conic-gradient(#eab308 ${mediumProgress}%, #ededed 0%)`;

            hardProgressCircle.style.background =
                `conic-gradient(#ef4444 ${hardProgress}%, #ededed 0%)`;


            // Display statistics cards
            cardStatsContainer.innerHTML = `

                <div class="card">
                    <h3>Total Solved</h3>
                    <p>${totalSolved}</p>
                </div>

                <div class="card">
                    <h3>Total Questions</h3>
                    <p>${totalQuestions}</p>
                </div>

                <div class="card">
                    <h3>Acceptance Rate</h3>
                    <p>${acceptanceRate}%</p>
                </div>

                <div class="card">
                    <h3>Global Ranking</h3>
                    <p>${ranking}</p>
                </div>

            `;


            statsContainer.style.display = "block";

        }

        catch (error) {

            console.error("Error:", error);

            alert(error.message);

        }

        finally {

            searchButton.textContent = "Search";
            searchButton.disabled = false;

        }
    }


    // Search button event listener
    searchButton.addEventListener("click", function () {

        const username = usernameInput.value.trim();

        console.log("Login username:", username);

        if (validateUsername(username)) {
            fetchUserDetails(username);
        }

    });

});
