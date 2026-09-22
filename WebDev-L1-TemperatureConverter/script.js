const temperatureInput = document.getElementById("temperature-input");
const fromUnit = document.getElementById("from-unit");
const toUnit = document.getElementById("to-unit");
const convertButton = document.getElementById("convert-button");
const conversionResult = document.getElementById("conversion-result");


function convertTemperature(temperature, from, to) {
    let celsius;

    // Convert the input temperature to Celsius first
    if (from === "celsius") {
        celsius = temperature;
    } else if (from === "fahrenheit") {
        celsius = (temperature - 32) * 5 / 9;
    } else if (from === "kelvin") {
        celsius = temperature - 273.15;
    }

    // Convert Celsius to the requested unit
    if (to === "celsius") {
        return celsius;
    } else if (to === "fahrenheit") {
        return (celsius * 9 / 5) + 32;
    } else if (to === "kelvin") {
        return celsius + 273.15;
    }
}


function getUnitSymbol(unit) {
    if (unit === "celsius") {
        return "°C";
    } else if (unit === "fahrenheit") {
        return "°F";
    } else {
        return "K";
    }
}


convertButton.addEventListener("click", function () {
    const temperature = Number(temperatureInput.value);
    const from = fromUnit.value;
    const to = toUnit.value;

    if (temperatureInput.value === "") {
        conversionResult.textContent = "Please enter a temperature.";
        return;
    }

    if (from === "celsius" && temperature < -273.15) {
        conversionResult.textContent = "Celsius cannot be below -273.15°C.";
        return;
    }

    if (from === "fahrenheit" && temperature < -459.67) {
        conversionResult.textContent = "Fahrenheit cannot be below -459.67°F.";
        return;
    }

    if (from === "kelvin" && temperature < 0) {
        conversionResult.textContent = "Kelvin cannot be below 0 K.";
        return;
    }

    const result = convertTemperature(temperature, from, to);
    const fromSymbol = getUnitSymbol(from);
    const toSymbol = getUnitSymbol(to);

    conversionResult.textContent =
        `${temperature} ${fromSymbol} = ${result.toFixed(2)} ${toSymbol}`;
});