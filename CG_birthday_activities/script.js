document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.endsWith("index.html")) {
        document.getElementById("user-form").addEventListener("submit", function (event) {
            event.preventDefault();

            const activities = Array.from(document.querySelectorAll("#activities input[type='text']"))
                .map(input => input.value)
                .filter(value => value.trim() !== "");

            const dob = document.getElementById("dob").value;

            if (!dob) {
                alert("Please enter your date of birth.");
                return;
            }

            localStorage.setItem("activities", JSON.stringify(activities));
            localStorage.setItem("dob", dob);

            window.location.href = "results.html";
        });
    } else if (window.location.pathname.endsWith("results.html")) {
        const activities = JSON.parse(localStorage.getItem("activities"));
        const dob = localStorage.getItem("dob");

        const daysUntilNextBirthday = calculateDaysUntilNextBirthday(dob);
        const age = calculateAge(dob);

        displayResults(activities, daysUntilNextBirthday, age);
    }
});

function calculateDaysUntilNextBirthday(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

    if (today > nextBirthday) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.ceil((nextBirthday - today) / msPerDay);
}

function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

function displayResults(activities, daysUntilNextBirthday, age) {
    const results = document.getElementById("results");
    results.innerHTML = `
        <h2>You have ${daysUntilNextBirthday} days until your next birthday, and you'll be ${age + 1} years old.</h2>
        <h3>Activity Suggestions:</h3>
    `;

    activities.forEach(activity => {
        const activityElement = document.createElement("div");
        activityElement.innerHTML = `<strong>${activity}</strong>`;
        const activityOptions = document.createElement("div");
        activityOptions.className = "activity-options";

        for (let i = 1; i <= 5; i++) {
            const option = document.createElement("div");
            option.className = "activity-option";
            option.textContent = `${activity} ${i}`;
            option.addEventListener("click", function () {
                alert(`You have chosen ${activity} ${i}`);
            });

            activityOptions.appendChild(option);
        }

        activityElement.appendChild(activityOptions);
        results.appendChild(activityElement);
    });
}
