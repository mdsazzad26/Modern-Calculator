
const result = document.getElementById("result");
const history = document.getElementById("history");
const buttons = document.querySelectorAll(".buttons button");

let expression = "";

buttons.forEach(function (button) {

    button.addEventListener("click", function () {

        const value = button.dataset.value;
        const action = button.dataset.action;

        // Clear All
        if (action === "clear") {

            expression = "";
            result.value = "0";
            history.textContent = "";

            return;
        }

        // Delete Last Character
        if (action === "delete") {

            expression = expression.slice(0, -1);
            result.value = expression || "0";

            return;
        }

        // Calculate Result
        if (action === "calculate") {

            calculateResult();

            return;
        }

        // Add Value
        if (value) {

            expression += value;
            result.value = expression;

        }

    });

});


// Calculator Function

function calculateResult() {

    try {

        if (!expression) return;

        // Validate Input
        if (!/^[0-9+\-*/%.()\s]+$/.test(expression)) {

            throw new Error("Invalid input");

        }

        // Calculate
        const finalResult = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(finalResult)) {

            throw new Error("Math error");

        }

        // Show History
        history.textContent = expression + " =";

        // Show Final Result
        expression = String(Number(finalResult.toFixed(8)));

        result.value = expression;

    }

    catch (error) {

        result.value = "Error";

        expression = "";

        history.textContent = "";

    }

}
