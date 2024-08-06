document.addEventListener("DOMContentLoaded", function () {
  // Function to calculate earnings
  function calculateEarnings() {
    const investmentAmount = parseFloat(
      document.getElementById("investmentAmount").value
    );
    const distributionFrequency = document.getElementById(
      "distributionFrequency"
    ).value;

    if (isNaN(investmentAmount) || investmentAmount < 6000) {
      alert("Der Mindestinvestitionsbetrag beträgt 6000€.");
      return;
    }

    const monthlyNetIncome = 8985.6;
    const serviceChargePercentage = 3.28;
    const profitSharePercentage = (1 / 600) * investmentAmount;

    const grossEarningsPerMonth =
      monthlyNetIncome *
      ((profitSharePercentage - serviceChargePercentage) / 100);

    let netEarnings;
    switch (distributionFrequency) {
      case "monthly":
        netEarnings = grossEarningsPerMonth;
        break;
      case "quarterly":
        netEarnings = grossEarningsPerMonth * 3;
        break;
      case "yearly":
        netEarnings = grossEarningsPerMonth * 12;
        break;
      default:
        alert("Ungültige Auszahlungsfrequenz.");
        return;
    }

    const yearlyNetEarnings = grossEarningsPerMonth * 12;

    document.getElementById(
      "grossEarnings"
    ).textContent = `Bruttoeinnahmen pro Monat: ${grossEarningsPerMonth
      .toFixed(2)
      .replace(".", ",")}€`;
    document.getElementById(
      "profitShare"
    ).textContent = `Gewinnbeteiligung: ${profitSharePercentage
      .toFixed(2)
      .replace(".", ",")}%`;
    document.getElementById(
      "netEarnings"
    ).textContent = `Nettogewinn (${distributionFrequency}): ${netEarnings
      .toFixed(2)
      .replace(".", ",")}€`;
    document.getElementById("results").style.display = "block";

    renderChart(yearlyNetEarnings);
  }

  // Function to render the chart
  function renderChart(yearlyNetEarnings) {
    const netEarningsArray = [];
    for (let i = 1; i <= 10; i++) {
      netEarningsArray.push(yearlyNetEarnings * i);
    }

    const ctx = document.getElementById("netProfitChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: Array.from(
          { length: 10 },
          (_, i) => (i + 1).toString() + " Jahre"
        ),
        datasets: [
          {
            label: "Nettoeinnahmen (€)",
            data: netEarningsArray,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(199, 199, 199, 0.2)",
              "rgba(83, 109, 254, 0.2)",
              "rgba(40, 167, 69, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(199, 199, 199, 1)",
              "rgba(83, 109, 254, 1)",
              "rgba(40, 167, 69, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: "red", // Set the color of the y-axis labels to red
              callback: (value) => value.toLocaleString("de-DE") + "€",
            },
          },
          x: {
            ticks: {
              color: "red", // Set the color of the x-axis labels to red
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                let label = context.dataset.label || "";
                if (label) {
                  label += ": ";
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y.toLocaleString("de-DE") + "€";
                }
                return label;
              },
            },
          },
          legend: {
            labels: {
              color: "red", // Set the color of the legend labels to red
            },
          },
        },
      },
    });
  }

  // Function to handle cookie consent
  const executeCodes = () => {
    if (document.cookie.includes("codinglab")) return;
    const cookieBox = document.querySelector(".wrapper");
    const buttons = document.querySelectorAll(".button");
    cookieBox.classList.add("show");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        cookieBox.classList.remove("show");

        if (button.id == "acceptBtn") {
          document.cookie = "cookieBy=codinglab; max-age=" + 60 * 60 * 24 * 30;
        }
      });
    });
  };

  window.addEventListener("load", executeCodes);

  // Add event listener to the calculate button
  document
    .getElementById("calculateButton")
    .addEventListener("click", calculateEarnings);

  // Add event listener for form submission
  document
    .getElementById("investmentForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission
      calculateEarnings(); // Call calculateEarnings function when the form is submitted
    });

  // Initial rendering of the chart
  renderChart(0); // Render an empty chart initially

  // Function to toggle visibility of additional content
  document.getElementById("showMoreBtn").addEventListener("click", function () {
    const moreInfo = document.getElementById("moreInfo");
    const showMoreBtn = document.getElementById("showMoreBtn");

    // Toggle visibility of additional content and change button text
    if (moreInfo.style.display === "none") {
      moreInfo.style.display = "block";
      showMoreBtn.textContent = "Show Less";
    } else {
      moreInfo.style.display = "none";
      showMoreBtn.textContent = "Show More";
    }
  });

  // Function to toggle label color
  function toggleLabelColor() {
    const labels = document.querySelectorAll("label");
    labels.forEach((label) => {
      label.classList.toggle("label-red");
    });
  }

  // Example of using the toggleLabelColor function
  // This is just an example, you can call this function based on your requirements
  document
    .getElementById("someButton")
    .addEventListener("click", toggleLabelColor);
});
