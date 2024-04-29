let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
]

function init(){
    render();
}

function render() {
    let tableHTML = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            tableHTML += `<td onclick="handleClick(${index})">`;
            if (fields[index] === 'circle') {
                tableHTML += generateCircleSVG();
            } else if (fields[index] === 'cross') {
                tableHTML += generateCrossSVG();
            }
            tableHTML += '</td>';
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';
    document.getElementById('content').innerHTML = tableHTML;
}

function generateCircleSVG() {
    const color = '#0FADED';
    const diameter = 70;

    return `
        <svg width="${diameter}" height="${diameter}">
            <circle cx="${diameter / 2}" cy="${diameter / 2}" r="${diameter / 2}" fill="none" stroke="${color}" stroke-width="2">
                <animate attributeName="r" from="0" to="${diameter / 2.5}" dur="0.125s" begin="0s" fill="freeze" />
                <animate attributeName="stroke-dashoffset" values="0 1000;1000 0" dur="1s" begin="1s" fill="freeze" />
            </circle>
        </svg>
    `;
}

function generateCrossSVG() {
    const color = '#FFC000';
    const size = 70;

    return `
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
            <line x1="${size / 4}" y1="${size / 4}" x2="${size * 3 / 4}" y2="${size * 3 / 4}" stroke="${color}" stroke-width="2">
                <animate attributeName="x2" from="${size / 4}" to="${size * 3 / 4}" dur="0.125s" fill="freeze" />
                <animate attributeName="y2" from="${size / 4}" to="${size * 3 / 4}" dur="0.125s" fill="freeze" />
            </line>
            <line x1="${size * 3 / 4}" y1="${size / 4}" x2="${size / 4}" y2="${size * 3 / 4}" stroke="${color}" stroke-width="2">
                <animate attributeName="x2" from="${size * 3 / 4}" to="${size / 4}" dur="0.125s" fill="freeze" />
                <animate attributeName="y2" from="${size / 4}" to="${size * 3 / 4}" dur="0.125s" fill="freeze" />
            </line>
        </svg>
    `;
}

function handleClick(index) {
    if (fields[index] === null) {
        const nextSymbol = getNextSymbol();
        fields[index] = nextSymbol;
        render();
        // Entferne das onclick-Attribut, um zu verhindern, dass das Feld erneut geklickt werden kann
        document.getElementsByTagName('td')[index].removeAttribute('onclick');
    }
}

function getNextSymbol() {
    let countCircle = fields.filter(symbol => symbol === 'circle').length;
    let countCross = fields.filter(symbol => symbol === 'cross').length;
    return countCircle <= countCross ? 'circle' : 'cross';
}