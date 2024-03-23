document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch holidays and update the UI
    async function fetchHolidays() {
        // Retrieve the full date and split into year, month, day
        const dateValue = document.getElementById('date').value;
        if (!dateValue) {
            alert("Please select a date.");
            return;
        }
        const [year, month, day] = dateValue.split('-');
        const country = document.getElementById('country').value;
        try {
            const response = await fetch('/getHolidays', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ year, month, day, country }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const holidays = await response.json();

            // Clear previous results and display new holidays
            const holidaysDiv = document.getElementById('holidays');
            holidaysDiv.innerHTML = ''; // Clear previous results
            if (holidays.length > 0) {
                holidays.forEach(holiday => {
                    const div = document.createElement('div');
                    div.textContent = `${holiday.date}: ${holiday.name}`;
                    holidaysDiv.appendChild(div);
                });
            } else {
                holidaysDiv.innerHTML = '<p>No holidays found for the selected date and country.</p>';
            }
        } catch (error) {
            console.error('Error fetching holiday data:', error);
            document.getElementById('holidays').innerHTML = '<p>Error fetching holiday data.</p>';
        }
    }

    // Event delegation for dynamically added content
    document.body.addEventListener("click", function(event) {
        if (event.target.id === "showHolidays") {
            fetchHolidays();
        }
    });
});
