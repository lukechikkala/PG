// Get input elements
const firstDigit  = document.getElementById('firstDigit');
const modeInput   = document.getElementById('modeInput');
const totalCount  = document.getElementById('totalCount');
const decimals    = document.getElementById('decimals');

// Get output / toggle elements
const differenceEl  = document.getElementById('difference');
const modeLabel     = document.getElementById('modeLabel');
const modeToggle    = document.getElementById('modeToggle');
const toggleBtns    = modeToggle.querySelectorAll('.toggle-opt');
const tableBody     = document.querySelector('#sequenceTable tbody');

let mode = 'last'; // 'second' = Second Digit, 'last' = Last Digit

function updateLabels() {
    modeLabel.textContent = mode === 'last' ? 'Last Digit' : 'Second Digit';
    toggleBtns.forEach(function (btn) {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
}

function generate() {
    const first = parseFloat(firstDigit.value);
    const count = parseInt(totalCount.value, 10);
    const dec   = parseInt(decimals.value, 10);
    const val   = parseFloat(modeInput.value);

    if (isNaN(first) || isNaN(count) || isNaN(dec) || isNaN(val) || count < 1 || dec < 0) {
        differenceEl.textContent = '—';
        tableBody.innerHTML      = '';
        return;
    }

    let diff;

    if (mode === 'second') {
        diff = val - first;
    } else {
        diff = count > 1 ? (val - first) / (count - 1) : 0;
    }

    differenceEl.textContent = diff.toFixed(dec);

    let rows = '';
    for (let i = 0; i < count; i++) {
        const value = first + i * diff;
        rows += `<tr><td>${i + 1}</td><td class="val">${value.toFixed(dec)}</td></tr>`;
    }
    tableBody.innerHTML = rows;
}

// Toggle mode via segmented buttons
modeToggle.addEventListener('click', function (e) {
    const btn = e.target.closest('.toggle-opt');
    if (!btn || btn.dataset.mode === mode) return;
    mode = btn.dataset.mode;
    modeInput.value = '';
    updateLabels();
    generate();
});

modeInput.addEventListener('input', generate);
firstDigit.addEventListener('input', generate);
totalCount.addEventListener('input', generate);
decimals.addEventListener('input', generate);

updateLabels();

// Click-to-copy on value cells
const toast = document.getElementById('toast');
let toastTimer;

tableBody.addEventListener('click', function (e) {
    const td = e.target.closest('td.val');
    if (!td) return;
    navigator.clipboard.writeText(td.textContent).then(function () {
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () {
            toast.classList.remove('show');
        }, 1200);
    });
});
