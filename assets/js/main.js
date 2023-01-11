(() => {
    console.log('Ok!');

    function Calculator(display) {
        this.display = display;
        this.bracket = 0;
        this.dot = false;
        this.equal = false;

        this.start = () => {
            buttonClick();
            keyboardEntry();
        };

        const buttonClick = () => {
            document.addEventListener('click', (event) => {
                const element = event.target;

                if (element.classList.contains('btn-num'))
                    toDisplay(element.innerText);

                if (element.classList.contains('btn-clear'))
                    clearDisplay();

                if (element.classList.contains('btn-del'))
                    eraseOne();

                if (element.classList.contains('btn-operator'))
                    operatorDisplay(element.innerText);

                if (element.classList.contains('btn-open-bracket'))
                    openBracket(element.innerText);

                if (element.classList.contains('btn-close-bracket')
                    && this.bracket)
                    closeBracket(element.innerText);

                if (element.classList.contains('btn-dot'))
                    dotDisplay(element.innerText);

                if (element.classList.contains('btn-eq'))
                    doCalculation();
            });
        };

        const keyboardEntry = () => {
            this.display.addEventListener('keypress', (event) => {
                event.preventDefault();

                if (event.key === 'Escape'
                    || event.key === "Delete") {
                    clearDisplay();
                    return;
                }

                if (event.key === 'Backspace') {
                    eraseOne();
                    return;
                }

                if (event.key === 'Enter') {
                    doCalculation();
                    return;
                }

                if (event.key === '/' || event.key === '*'
                    || event.key === '-' || event.key === '+') {
                    operatorDisplay(event.key);
                    return;
                }

                if (event.key === '(') {
                    openBracket(event.key);
                    return;
                }

                if (event.key === ')' && this.bracket) {
                    closeBracket(event.key);
                    return;
                }

                if (event.key === '.') {
                    dotDisplay(event.key);
                    return;
                }

                toDisplay(event.key);
            });
        };

        const toDisplay = (value) => {
            if (this.equal) {
                this.display.value = '';
                this.equal = false;
            }

            if (testCalculation(value))
                this.display.value += value;
        };

        const clearDisplay = () => {
            this.display.value = '';
            this.dot = false;
            this.bracket = 0;
            this.equal = false;
        };

        const eraseOne = () => {
            const lastDigit = this.display.value.slice(-1);
            if (lastDigit === '(')
                this.bracket--;

            if (lastDigit === ')')
                this.bracket++;

            if (lastDigit === '.')
                this.dot = false;

            this.display.value = this.display.value.slice(0, -1);
        };

        const operatorDisplay = (value) => {
            if (lastDigitIsOpenBracket())
                this.display.value = this.display.value.slice(0, -1);

            if (!lastDigitIsNumber()
                && !lastDigitIsCloseBracket())
                this.display.value = this.display.value.slice(0, -1);

            if (displayIsEmpty())
                return;

            toDisplay(value);
            this.dot = false;
        };

        const openBracket = (value) => {
            if (!lastDigitIsNumber() && this.dot)
                return;

            if (lastDigitIsNumber() && !displayIsEmpty() && !this.equal)
                toDisplay('*')

            toDisplay(value);
            this.bracket++;
        };

        const closeBracket = (value) => {
            if (lastDigitIsNumber()
                || lastDigitIsCloseBracket()) {
                toDisplay(value);
                this.bracket--;
            }
        };

        const dotDisplay = (value) => {
            if (lastDigitIsCloseBracket() || this.dot)
                return;

            if (!lastDigitIsNumber()
                || lastDigitIsOpenBracket()
                || displayIsEmpty())
                toDisplay('0')

            toDisplay(value);
            this.dot = true;
        };

        const doCalculation = () => {
            try {
                const calculation = eval(this.display.value);
                this.display.value = calculation;
                this.equal = true;
            } catch (error) {
                alert('Conta inválida!');
                return;
            }
        };

        const testCalculation = (calculation) => {
            let pattern = /[0-9\.\-\/\+\*\(\)]+$/g;
            return pattern.test(calculation);
        };

        const lastDigitIsNumber = () => {
            const lastDigit = Number(this.display.value.slice(-1));
            return Number.isInteger(lastDigit);
        };

        const lastDigitIsOpenBracket = () => {
            const lastDigit = this.display.value.slice(-1);
            return lastDigit === '(';
        };

        const lastDigitIsCloseBracket = () => {
            const lastDigit = this.display.value.slice(-1);
            return lastDigit === ')';
        };

        const displayIsEmpty = () => {
            if (this.display.value.length === 0)
                return true;
        };

    }

    const display = document.querySelector('.display');
    const calculator = new Calculator(display);

    calculator.start();
})();