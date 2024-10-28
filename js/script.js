const startDate = new Date(2024, 9, 28); // Start date: October 28, 2024
const endDate = new Date(2025, 5, 27); // End date: June 27, 2025
const savingsPerDay = 50;
let totalSavings = 0;

// Retrieve saved data from LocalStorage
const savedData = JSON.parse(localStorage.getItem('savingsPlan')) || {};

function generateSavingsPlan() {
  let currentDate = new Date(startDate);
  const container = document.getElementById('savingsPlan');

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();

    // Only count Monday to Friday
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const dayElement = document.createElement('div');
      dayElement.className = 'day';
      const dayIndex = container.children.length;
      dayElement.textContent = dayIndex + 1;

      // Save the date for this specific day square
      const dateString = currentDate.toLocaleDateString('en-GB');

      // Add hover effect to show date
      dayElement.addEventListener('mouseenter', () => {
        document.getElementById(
          'dateDisplay',
        ).textContent = `Date: ${dateString}`;
      });
      dayElement.addEventListener('mouseleave', () => {
        document.getElementById('dateDisplay').textContent = '';
      });

      // Set initial completion status based on LocalStorage
      if (savedData[dayIndex]) {
        dayElement.classList.add('completed');
        totalSavings += savingsPerDay;
      }

      // Add click event to toggle savings mark and update LocalStorage
      dayElement.addEventListener('click', function () {
        if (!dayElement.classList.contains('completed')) {
          dayElement.classList.add('completed');
          totalSavings += savingsPerDay;
          savedData[dayIndex] = true;
        } else {
          dayElement.classList.remove('completed');
          totalSavings -= savingsPerDay;
          delete savedData[dayIndex];
        }
        updateTotalSavings();
        localStorage.setItem('savingsPlan', JSON.stringify(savedData));
      });

      container.appendChild(dayElement);
    }

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  updateTotalSavings(); // Initial total savings display
}

function updateTotalSavings() {
  const totalElement = document.getElementById('totalSavings');
  totalElement.textContent = `Total Savings: $${totalSavings}`;
}

// Generate the plan when the page loads
generateSavingsPlan();
