const noBtn = document.getElementById('noBtn');
const page1 = document.getElementById('page1');
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('click', moveButton); 

function moveButton() {
    const padding = 20;
    const maxX = page1.clientWidth - noBtn.offsetWidth - padding;
    const maxY = page1.clientHeight - noBtn.offsetHeight - padding;
    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding + 40, Math.floor(Math.random() * maxY));
    page1.appendChild(noBtn);
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

function nextPage(pageNumber) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page' + pageNumber).classList.add('active');
    if(pageNumber === 2 && noBtn) { noBtn.remove(); }
    if(pageNumber === 3) {
        document.body.classList.add('final-body');
        document.getElementById('mainContainer').style.boxShadow = "none";
        document.getElementById('mainContainer').style.background = "transparent";
    }
}

let selectedDay = '', selectedMonth = '', selectedYear = '';
const daysGrid = document.getElementById('daysGrid');
const monthsGrid = document.getElementById('monthsGrid');
const yearsGrid = document.getElementById('yearsGrid');

for(let i=1; i<=31; i++) createGridItem(daysGrid, i, 'day');
for(let i=1; i<=12; i++) createGridItem(monthsGrid, i, 'month');
for(let i=2026; i<=2030; i++) createGridItem(yearsGrid, i, 'year');

function createGridItem(container, value, type) {
    const item = document.createElement('div');
    item.classList.add('grid-item');
    item.innerText = value;
    item.addEventListener('click', () => {
        container.querySelectorAll('.grid-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        if(type === 'day') selectedDay = value;
        if(type === 'month') selectedMonth = value;
        if(type === 'year') selectedYear = value;
        updateDateDisplay();
    });
    container.appendChild(item);
}

function updateDateDisplay() {
    if(selectedDay && selectedMonth && selectedYear) {
        const fullDate = `${selectedYear} / ${selectedMonth} / ${selectedDay}`;
        document.getElementById('finalDateText').innerText = fullDate;
        document.getElementById('finalDateText').style.color = "#FFFFFF";
        document.getElementById('finalDateText').style.backgroundColor = "#FF5F7E";
        document.getElementById('hiddenDateInput').value = fullDate; 
    }
}

document.getElementById('emailForm').addEventListener('submit', function(e) {
    if(!selectedDay || !selectedMonth || !selectedYear) {
        e.preventDefault();
        alert('من فضلك اختر التاريخ كاملاً أولاً! ❤️');
        return;
    }
    e.preventDefault(); 
    fetch(this.action, { method: this.method, body: new FormData(this), headers: { 'Accept': 'application/json' } })
    .then(() => nextPage(3)).catch(() => nextPage(3));
});
