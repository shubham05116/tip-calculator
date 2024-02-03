import React, { useState, useEffect } from 'react';
import "./App.css";

const TipCalculator = () => {
    const [billAmount, setBillAmount] = useState('');
    const [numPeople, setNumPeople] = useState('');
    const [customPercent, setCustomPercent] = useState('');
    const [percent, setPercent] = useState(0);
    const [tipTotal, setTipTotal] = useState('0.00');
    const [totalPerson, setTotalPerson] = useState('0.00');
    const [isResetBtnDisabled, setIsResetBtnDisabled] = useState(true);
    const [isWarningVisible, setIsWarningVisible] = useState(false);
    const [selectedTipButton, setSelectedTipButton] = useState(null);

    // selecting the tip percentage :
    const handleTipButtonClick = (value) => {
        setSelectedTipButton(value);
        setPercent(value);
    };

    useEffect(() => {
        setIsResetBtnDisabled(billAmount === '');
    }, [billAmount]);

    //Handling Bill Amount:
    const handleBillAmountChange = (e) => {
        setBillAmount(e.target.value);
        setIsResetBtnDisabled(e.target.value === '');
        setIsWarningVisible(numPeople === 0);
    };

    //No of Persons dividing tip
    const handleNumPeopleChange = (e) => {
        setNumPeople(e.target.value);
        setIsWarningVisible(e.target.value === '' || Number(e.target.value) === 0);
    };

    //reset button
    const resetBtn = () => {
        setBillAmount('');
        setNumPeople('');
        setCustomPercent('');
        setPercent(0);
        setTipTotal('0.00');
        setTotalPerson('0.00');
        setIsWarningVisible(false);
        setSelectedTipButton(null);

    };

    useEffect(() => {
        if (customPercent > 100) {
            alert('Percentage cannot be greater than 100!');
            resetBtn();
        }

        if (billAmount !== '' && numPeople !== '' && percent !== 0) {
            const calculatedTipTotal = (billAmount * percent) / 100;
            const calculatedTotalPerson = (billAmount / numPeople) + (calculatedTipTotal / numPeople);

            setTipTotal((calculatedTipTotal / numPeople).toFixed(2));
            setTotalPerson(calculatedTotalPerson.toFixed(2));
        }
    }, [billAmount, numPeople, percent, customPercent]);

    //Custom Percentage
    const handleCustomPercentChange = (e) => {
        const customPercentValue = Number(e.target.value);
        setSelectedTipButton(null);
        setCustomPercent(customPercentValue);
        setPercent(customPercentValue <= 100 ? customPercentValue : 0);
    };

    return (
        <>
            <section className="container">
                <article className="input-container">
                    <form className="amount-input">
                        <div className="dollar-input">
                            <input
                                className="input-field"
                                type="number"
                                name="billAmount"
                                id="bill-amount"
                                placeholder="0"
                                min="0"
                                value={billAmount}
                                onChange={handleBillAmountChange}
                            />
                        </div>
                    </form>
                    <form className="select-tip">
                        <label>Select Tip %</label>
                        <div className="percent-options">
                            {[5, 10, 15, 25, 50].map((value) => (
                                <button
                                    key={value}
                                    type="button"
                                    className={`btn_${value} ${selectedTipButton === value ? 'click' : ''}`}
                                    aria-label={`add-${value}-percentage`}
                                    onClick={() => handleTipButtonClick(value)}
                                >
                                    {value}
                                </button>
                            ))}
                            <input
                                id="custom"
                                className={`custom-percentage ${selectedTipButton === null ? 'click' : ''}`}
                                type="number"
                                max="100"
                                placeholder="Custom"
                                value={customPercent}
                                onChange={handleCustomPercentChange}
                            />
                        </div>
                    </form>
                    <form className="num-people">
                        <label htmlFor="people-count">
                            Number of People <span className={isWarningVisible ? 'empty' : ''}>Can't be zero</span>
                        </label>
                        <input
                            className={`input-field ${isWarningVisible ? 'empty' : ''}`}
                            type="number"
                            name="number-people"
                            id="people-count"
                            placeholder="0"
                            required
                            min="0"
                            max="100"
                            value={numPeople}
                            onChange={handleNumPeopleChange}
                        />
                    </form>
                </article>
                <article className="display-container">
                    <div className="display-tip">
                        <div>
                            <p className="display-description">Tip Amount</p>
                            <p>/ person</p>
                        </div>
                        <p className="amount show-tip">${tipTotal}</p>
                    </div>
                    <div className="display-total">
                        <div>
                            <p className="display-description">Total</p>
                            <p>/ person</p>
                        </div>
                        <p className="amount show-total">${totalPerson}</p>
                    </div>
                    <button
                        className="reset-btn"
                        aria-label="reset"
                        onClick={resetBtn}
                        disabled={isResetBtnDisabled}
                    >
                        Reset
                    </button>
                </article>
            </section>
        </>
    )


}

export default TipCalculator
