import Phases from "./phases.js";

window.handlePhases = () => {
    const dateValue = document
        .getElementById('date')
        .value;
    const resultInfo = document
        .getElementsByClassName('result-info')
        .item(0);
    const resultContent = document
        .getElementsByClassName('result-content')
        .item(0);

    if(dateValue === null || dateValue === undefined || dateValue === '') {
        resultInfo.innerHTML = "Pick a date!";
        resultContent.classList.add('hidden');
        return;
    }

    resultInfo.innerHTML = "Calculating..."

    const date = new Date(dateValue);
    let phases = new Phases(date);

    phases.calculate();

    resultContent.innerHTML = "<div>It will be " + phases.phase + "</div>";
    document.getElementById('moonPhaseImage').src = "assets/images/" + phases.phase.replace(' ', '-') + '.png';
    resultContent.classList.remove('hidden');
    resultInfo.innerHTML = "Result:"
}