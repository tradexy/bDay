function handleSubmit(event) {
    event.preventDefault();
  
    // Get the user's input
    const activities = [
      document.querySelector("input[name=activity1]").value,
      document.querySelector("input[name=activity2]").value,
      document.querySelector("input[name=activity3]").value,
      document.querySelector("input[name=activity4]").value,
      document.querySelector("input[name=activity5]").value,
    ];
    const birthday = document.querySelector("input[name=birthday]").value;
  
    // Calculate the number of days until the user's next birthday
    const today = new Date();
    const nextBirthday = new Date(birthday);
    const daysUntilNextBirthday = (nextBirthday - today) / (1000 * 60 * 60 * 24);
  
    // Create a list of options for each activity
    const options = activities.map((activity) => {
      const optionsList = [];
      for (let i = 1; i <= 5; i++) {
        optionsList.push(`${activity} ${i}`);
      }
      return optionsList;
    });
  
    // Display the results on a separate page
    window.location.href = "results.html";
  }
  