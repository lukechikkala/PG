// ============================================
// Date & Time Difference Calculator
// ============================================

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const $ = id => document.getElementById(id);

// ---- DOM refs ----
const startDateEl     = $('startDate');
const endDateEl       = $('endDate');
const dYearsEl        = $('dYears');
const dMonthsEl       = $('dMonths');
const dWeeksEl        = $('dWeeks');
const dDaysEl         = $('dDays');
const dateTotalUnitEl = $('dateTotalUnit');
const dateTotalValEl  = $('dateTotalValue');

const startTimeEl      = $('startTime');
const endTimeEl        = $('endTime');
const tHoursEl         = $('tHours');
const tMinutesEl       = $('tMinutes');
const tSecondsEl       = $('tSeconds');
const tMillisecondsEl  = $('tMilliseconds');
const timeTotalUnitEl  = $('timeTotalUnit');
const timeTotalValEl   = $('timeTotalValue');

// ---- State ----
let fpStart, fpEnd;
let cachedStartDate = null;
let cachedEndDate   = null;
let dateTotalDays   = 0;

let cachedStartTimeMs = null;
let cachedEndTimeMs   = null;
let timeTotalMs       = 0;

// ============================================
// DATE — computation helpers
// ============================================

function dateBreakdown(d1, d2) {
    let early = d1 <= d2 ? new Date(d1) : new Date(d2);
    let late  = d1 <= d2 ? new Date(d2) : new Date(d1);

    let years  = late.getFullYear() - early.getFullYear();
    let months = late.getMonth()    - early.getMonth();
    let days   = late.getDate()     - early.getDate();

    if (days < 0) {
        months--;
        days += new Date(late.getFullYear(), late.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    const weeks = Math.floor(days / 7);
    days = days % 7;

    const totalDays = Math.round(Math.abs(late - early) / 86400000);
    return { years, months, weeks, days, totalDays };
}

function showDateBreakdown(bd) {
    dYearsEl.value  = bd.years;
    dMonthsEl.value = bd.months;
    dWeeksEl.value  = bd.weeks;
    dDaysEl.value   = bd.days;
    dateTotalDays   = bd.totalDays;
    updateDateTotal();
}

function updateDateTotal() {
    const unit = dateTotalUnitEl.value;
    let val;
    switch (unit) {
        case 'days':   val = dateTotalDays; break;
        case 'weeks':  val = dateTotalDays / 7; break;
        case 'months': val = dateTotalDays / 30.4375; break;
        case 'years':  val = dateTotalDays / 365.25; break;
    }
    dateTotalValEl.textContent = unit === 'days'
        ? Math.round(val).toLocaleString()
        : val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function clearDateResults() {
    dYearsEl.value = '';
    dMonthsEl.value = '';
    dWeeksEl.value = '';
    dDaysEl.value = '';
    dateTotalDays = 0;
    dateTotalValEl.textContent = '\u2014';
}

// ---- DATE — event handlers ----

function onDateInputChange() {
    if (cachedStartDate && cachedEndDate) {
        showDateBreakdown(dateBreakdown(cachedStartDate, cachedEndDate));
    }
}

function onDateBreakdownChange() {
    const y = parseInt(dYearsEl.value)  || 0;
    const m = parseInt(dMonthsEl.value) || 0;
    const w = parseInt(dWeeksEl.value)  || 0;
    const d = parseInt(dDaysEl.value)   || 0;

    if (cachedStartDate) {
        const end = new Date(cachedStartDate);
        end.setFullYear(end.getFullYear() + y);
        end.setMonth(end.getMonth() + m);
        end.setDate(end.getDate() + w * 7 + d);
        cachedEndDate = end;
        fpEnd.setDate(end, false);
        dateTotalDays = Math.round(Math.abs(end - cachedStartDate) / 86400000);
        updateDateTotal();
    } else if (cachedEndDate) {
        const start = new Date(cachedEndDate);
        start.setFullYear(start.getFullYear() - y);
        start.setMonth(start.getMonth() - m);
        start.setDate(start.getDate() - (w * 7 + d));
        cachedStartDate = start;
        fpStart.setDate(start, false);
        dateTotalDays = Math.round(Math.abs(cachedEndDate - start) / 86400000);
        updateDateTotal();
    }
}

// Wire up date breakdown field events
[dYearsEl, dMonthsEl, dWeeksEl, dDaysEl].forEach(el => {
    el.addEventListener('input', onDateBreakdownChange);
});

dateTotalUnitEl.addEventListener('change', updateDateTotal);

// ============================================
// TIME — computation helpers
// ============================================

function parseTime(str) {
    if (!str || !str.trim()) return null;
    const m = str.trim().match(/^(\d{1,2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?$/);
    if (!m) return null;
    return parseInt(m[1]) * 3600000
         + parseInt(m[2]) * 60000
         + (m[3] ? parseInt(m[3]) * 1000 : 0)
         + (m[4] ? parseInt(m[4].padEnd(3, '0')) : 0);
}

function formatTime(ms) {
    if (ms < 0) ms = 0;
    const h   = Math.floor(ms / 3600000); ms %= 3600000;
    const min = Math.floor(ms / 60000);   ms %= 60000;
    const s   = Math.floor(ms / 1000);    ms %= 1000;
    return `${String(h).padStart(2,'0')}:${String(min).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(ms).padStart(3,'0')}`;
}

function timeBreakdown(total) {
    let ms = Math.abs(total);
    const hours        = Math.floor(ms / 3600000); ms %= 3600000;
    const minutes      = Math.floor(ms / 60000);   ms %= 60000;
    const seconds      = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;
    return { hours, minutes, seconds, milliseconds };
}

function showTimeBreakdown(bd) {
    tHoursEl.value        = bd.hours;
    tMinutesEl.value      = bd.minutes;
    tSecondsEl.value      = bd.seconds;
    tMillisecondsEl.value = bd.milliseconds;
}

function updateTimeTotal() {
    const unit = timeTotalUnitEl.value;
    let val;
    switch (unit) {
        case 'milliseconds': val = timeTotalMs; break;
        case 'seconds':      val = timeTotalMs / 1000; break;
        case 'minutes':      val = timeTotalMs / 60000; break;
        case 'hours':        val = timeTotalMs / 3600000; break;
    }
    timeTotalValEl.textContent = (unit === 'milliseconds')
        ? Math.round(val).toLocaleString()
        : Math.floor(val).toLocaleString();
}

function clearTimeResults() {
    tHoursEl.value = '';
    tMinutesEl.value = '';
    tSecondsEl.value = '';
    tMillisecondsEl.value = '';
    timeTotalMs = 0;
    timeTotalValEl.textContent = '\u2014';
}

// ---- TIME — event handlers ----

function onTimeInputChange() {
    cachedStartTimeMs = parseTime(startTimeEl.value);
    cachedEndTimeMs   = parseTime(endTimeEl.value);

    if (cachedStartTimeMs !== null && cachedEndTimeMs !== null) {
        timeTotalMs = Math.abs(cachedEndTimeMs - cachedStartTimeMs);
        showTimeBreakdown(timeBreakdown(timeTotalMs));
        updateTimeTotal();
    }
}

function onTimeBreakdownChange() {
    const h  = parseInt(tHoursEl.value)        || 0;
    const m  = parseInt(tMinutesEl.value)      || 0;
    const s  = parseInt(tSecondsEl.value)      || 0;
    const ms = parseInt(tMillisecondsEl.value) || 0;
    timeTotalMs = h * 3600000 + m * 60000 + s * 1000 + ms;

    if (cachedStartTimeMs !== null) {
        cachedEndTimeMs = cachedStartTimeMs + timeTotalMs;
        endTimeEl.value = formatTime(cachedEndTimeMs);
        updateTimeTotal();
    } else if (cachedEndTimeMs !== null) {
        cachedStartTimeMs = Math.max(0, cachedEndTimeMs - timeTotalMs);
        startTimeEl.value = formatTime(cachedStartTimeMs);
        updateTimeTotal();
    }
}

startTimeEl.addEventListener('input', onTimeInputChange);
endTimeEl.addEventListener('input', onTimeInputChange);

[tHoursEl, tMinutesEl, tSecondsEl, tMillisecondsEl].forEach(el => {
    el.addEventListener('input', onTimeBreakdownChange);
});

timeTotalUnitEl.addEventListener('change', updateTimeTotal);

// ============================================
// Auto-format masks (date: DD.MM.YYYY, time: HH:MM:SS.mmm)
// ============================================

function maskDate(el) {
    el.addEventListener('input', function(e) {
        // Strip non-digits
        let digits = el.value.replace(/\D/g, '');
        if (digits.length > 8) digits = digits.slice(0, 8);
        let formatted = '';
        for (let i = 0; i < digits.length; i++) {
            if (i === 2 || i === 4) formatted += '.';
            formatted += digits[i];
        }
        el.value = formatted;
    });
    el.addEventListener('keydown', function(e) {
        // Allow backspace to delete past separators naturally
        if (e.key === 'Backspace') {
            const pos = el.selectionStart;
            if (pos > 0 && el.value[pos - 1] === '.') {
                e.preventDefault();
                el.value = el.value.slice(0, pos - 1) + el.value.slice(pos);
                el.setSelectionRange(pos - 1, pos - 1);
                el.dispatchEvent(new Event('input'));
            }
        }
    });
}

function maskTime(el) {
    el.addEventListener('input', function(e) {
        let digits = el.value.replace(/\D/g, '');
        if (digits.length > 9) digits = digits.slice(0, 9);
        let formatted = '';
        for (let i = 0; i < digits.length; i++) {
            if (i === 2 || i === 4) formatted += ':';
            if (i === 6) formatted += '.';
            formatted += digits[i];
        }
        el.value = formatted;
    });
    el.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace') {
            const pos = el.selectionStart;
            if (pos > 0 && (el.value[pos - 1] === ':' || el.value[pos - 1] === '.')) {
                e.preventDefault();
                el.value = el.value.slice(0, pos - 1) + el.value.slice(pos);
                el.setSelectionRange(pos - 1, pos - 1);
                el.dispatchEvent(new Event('input'));
            }
        }
    });
    el.addEventListener('blur', function() {
        let digits = el.value.replace(/\D/g, '');
        if (digits.length === 0) return;
        // Pad to 9 digits: HHMMSS mmm
        digits = digits.padEnd(9, '0');
        el.value = digits.slice(0,2) + ':' + digits.slice(2,4) + ':' + digits.slice(4,6) + '.' + digits.slice(6,9);
        el.dispatchEvent(new Event('input'));
    });
}

// Apply time masks immediately
maskTime(startTimeEl);
maskTime(endTimeEl);

// ============================================
// Flatpickr setup — dark themed date pickers
// ============================================

function addTodayButton(instance) {
    const btn = document.createElement('button');
    btn.textContent = 'Today';
    btn.type = 'button';
    btn.className = 'flatpickr-today-btn';
    btn.addEventListener('click', () => instance.setDate(new Date(), true));
    const wrap = document.createElement('div');
    wrap.className = 'flatpickr-today-wrap';
    wrap.appendChild(btn);
    instance.calendarContainer.appendChild(wrap);
}

function setupCustomHeader(instance) {
    const cal = instance.calendarContainer;
    const monthContainer = cal.querySelector('.flatpickr-current-month');
    if (!monthContainer) return;

    // Hide native month select and year input
    const nativeSelect   = monthContainer.querySelector('.flatpickr-monthDropdown-months');
    const nativeYearWrap = monthContainer.querySelector('.numInputWrapper');
    if (nativeSelect)   nativeSelect.style.display = 'none';
    if (nativeYearWrap) nativeYearWrap.style.display = 'none';

    // Custom month label
    const monthLabel = document.createElement('span');
    monthLabel.className = 'custom-month-label';
    monthLabel.textContent = MONTH_NAMES[instance.currentMonth];
    monthContainer.insertBefore(monthLabel, monthContainer.firstChild);

    // Custom year label
    const yearLabel = document.createElement('span');
    yearLabel.className = 'custom-year-label';
    yearLabel.textContent = instance.currentYear;
    monthContainer.appendChild(yearLabel);

    // ---- Month picker panel ----
    const monthPanel = document.createElement('div');
    monthPanel.className = 'custom-picker-panel month-panel';
    monthPanel.style.display = 'none';

    const monthGrid = document.createElement('div');
    monthGrid.className = 'picker-grid month-grid';
    MONTH_NAMES.forEach((m, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'picker-cell';
        btn.textContent = m;
        btn.dataset.month = i;
        btn.addEventListener('click', () => {
            instance.changeMonth(i - instance.currentMonth);
            monthPanel.style.display = 'none';
        });
        monthGrid.appendChild(btn);
    });
    monthPanel.appendChild(monthGrid);
    cal.appendChild(monthPanel);

    // ---- Year picker panel ----
    const yearPanel = document.createElement('div');
    yearPanel.className = 'custom-picker-panel year-panel';
    yearPanel.style.display = 'none';

    const yearInput = document.createElement('input');
    yearInput.type = 'number';
    yearInput.className = 'year-input';
    yearInput.value = instance.currentYear;
    yearInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            const y = parseInt(yearInput.value);
            if (!isNaN(y) && y > 0) {
                instance.changeYear(y);
                yearPanel.style.display = 'none';
            }
        }
    });
    yearPanel.appendChild(yearInput);

    const yearGrid = document.createElement('div');
    yearGrid.className = 'picker-grid year-grid';
    yearPanel.appendChild(yearGrid);
    cal.appendChild(yearPanel);

    function buildYearGrid(center) {
        yearGrid.innerHTML = '';
        for (let y = center - 4; y <= center + 7; y++) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'picker-cell' + (y === instance.currentYear ? ' active' : '');
            btn.textContent = y;
            btn.addEventListener('click', () => {
                instance.changeYear(y);
                yearPanel.style.display = 'none';
            });
            yearGrid.appendChild(btn);
        }
    }

    // Toggle panels
    monthLabel.addEventListener('click', e => {
        e.stopPropagation();
        yearPanel.style.display = 'none';
        monthGrid.querySelectorAll('.picker-cell').forEach(c => {
            c.classList.toggle('active', parseInt(c.dataset.month) === instance.currentMonth);
        });
        monthPanel.style.display = monthPanel.style.display === 'none' ? 'flex' : 'none';
    });

    yearLabel.addEventListener('click', e => {
        e.stopPropagation();
        monthPanel.style.display = 'none';
        yearInput.value = instance.currentYear;
        buildYearGrid(instance.currentYear);
        yearPanel.style.display = yearPanel.style.display === 'none' ? 'flex' : 'none';
        yearInput.focus();
        yearInput.select();
    });

    // Store refs for update
    instance._customMonthLabel = monthLabel;
    instance._customYearLabel  = yearLabel;
    instance._monthPanel       = monthPanel;
    instance._yearPanel        = yearPanel;
}

function onFpHeaderChange(_, __, instance) {
    if (instance._customMonthLabel) instance._customMonthLabel.textContent = MONTH_NAMES[instance.currentMonth];
    if (instance._customYearLabel)  instance._customYearLabel.textContent  = instance.currentYear;
    if (instance._monthPanel) instance._monthPanel.style.display = 'none';
    if (instance._yearPanel)  instance._yearPanel.style.display  = 'none';
}

const fpConfig = {
    dateFormat: 'd.m.Y',
    allowInput: true,
    onReady: function(_, __, instance) {
        setupCustomHeader(instance);
        addTodayButton(instance);
        // Apply date mask to the visible alt-input created by flatpickr
        if (instance.altInput) {
            instance.altInput.placeholder = 'DD.MM.YYYY';
            maskDate(instance.altInput);
        } else {
            maskDate(instance.input);
        }
    },
    onMonthChange: onFpHeaderChange,
    onYearChange:  onFpHeaderChange
};

// ============================================
// Reset handlers
// ============================================

$('resetDate').addEventListener('click', function() {
    fpStart.clear();
    fpEnd.clear();
    cachedStartDate = null;
    cachedEndDate = null;
    clearDateResults();
});

$('resetTime').addEventListener('click', function() {
    startTimeEl.value = '';
    endTimeEl.value = '';
    cachedStartTimeMs = null;
    cachedEndTimeMs = null;
    clearTimeResults();
});

fpStart = flatpickr('#startDate', Object.assign({}, fpConfig, {
    onChange: function(selectedDates) {
        cachedStartDate = selectedDates[0] || null;
        onDateInputChange();
    }
}));

fpEnd = flatpickr('#endDate', Object.assign({}, fpConfig, {
    onChange: function(selectedDates) {
        cachedEndDate = selectedDates[0] || null;
        onDateInputChange();
    }
}));
