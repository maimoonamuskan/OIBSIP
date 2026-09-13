const temperatureInput = document.getElementById("temperature");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const convertBtn = document.getElementById("convertBtn");
const resetBtn = document.getElementById("resetBtn");
const result = document.getElementById("result");

function convertTemperature() {
    const temperature = Number(temperatureInput.value);
    const from = fromUnit.value;
    const to = toUnit.value;

    if (temperatureInput.value.trim() === "") {
        result.textContent = "Please enter a temperature";
        return;
    }

    if (!Number.isFinite(temperature)) {
        result.textContent = "Please enter a valid number";
        return;
    }

    if (from === "celsius" && temperature < -273.15) {
        result.textContent = "Celsius cannot be below -273.15°C";
        return;
    }

    if (from === "fahrenheit" && temperature < -459.67) {
        result.textContent = "Fahrenheit cannot be below -459.67°F";
        return;
    }

    if (from === "kelvin" && temperature < 0) {
        result.textContent = "Kelvin cannot be below 0 K";
        return;
    }

    let celsius;

    if (from === "celsius") {
        celsius = temperature;
    } else if (from === "fahrenheit") {
        celsius = (temperature - 32) * 5 / 9;
    } else {
        celsius = temperature - 273.15;
    }

    let converted;

    if (to === "celsius") {
        converted = celsius;
    } else if (to === "fahrenheit") {
        converted = (celsius * 9 / 5) + 32;
    } else {
        converted = celsius + 273.15;
    }

    const symbols = {
        celsius: "°C",
        fahrenheit: "°F",
        kelvin: "K"
    };

    result.textContent = `${temperature} ${symbols[from]} = ${converted.toFixed(2)} ${symbols[to]}`;
}

function resetConverter() {
    temperatureInput.value = "";
    fromUnit.value = "celsius";
    toUnit.value = "fahrenheit";
    result.textContent = "Your result will appear here";
    temperatureInput.focus();
}

convertBtn.addEventListener("click", convertTemperature);
resetBtn.addEventListener("click", resetConverter);

temperatureInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        convertTemperature();
    }
});