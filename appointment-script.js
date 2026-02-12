// Appointment Booking JavaScript
let selectedDate = null;
let selectedTime = null;
let currentMonth = new Date();

// Step Navigation
function nextStep(step) {
    const currentSteps = document.querySelectorAll('.step, .form-step');
    currentSteps.forEach(s => s.classList.remove('active'));
    
    document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
    document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
    
    if (step === 3) {
        updateConfirmation();
    }
    if (step === 2) {
        generateCalendar();
        generateTimeSlots();
    }
}

function prevStep(step) {
    nextStep(step);
}

// Generate Calendar
function generateCalendar() {
    const grid = document.getElementById('calendarGrid');
    const monthDisplay = document.getElementById('currentMonth');
    
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    monthDisplay.textContent = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    grid.innerHTML = '';
    
    // Day headers
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
        const header = document.createElement('div');
        header.textContent = day;
        header.style.fontWeight = '700';
        header.style.padding = '0.5rem';
        header.style.textAlign = 'center';
        grid.appendChild(header);
    });
    
    // Empty cells
    for (let i = 0; i < firstDay; i++) {
        grid.appendChild(document.createElement('div'));
    }
    
    // Days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        dayEl.textContent = day;
        
        const date = new Date(year, month, day);
        if (date < today) {
            dayEl.classList.add('disabled');
        } else {
            dayEl.onclick = () => selectDate(date);
        }
        
        grid.appendChild(dayEl);
    }
}

function selectDate(date) {
    selectedDate = date;
    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
    event.target.classList.add('selected');
    
    document.getElementById('selectedDateDisplay').textContent = 
        date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    generateTimeSlots();
}

function generateTimeSlots() {
    const container = document.getElementById('timeSlots');
    if (!selectedDate) {
        container.innerHTML = '<p style="text-align:center;color:var(--text-secondary);">Please select a date first</p>';
        return;
    }
    
    const times = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];
    container.innerHTML = '';
    
    times.forEach(time => {
        const slot = document.createElement('div');
        slot.className = 'time-slot';
        slot.textContent = time;
        slot.onclick = () => {
            document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
            slot.classList.add('selected');
            selectedTime = time;
        };
        container.appendChild(slot);
    });
}

// Calendar Navigation
document.getElementById('prevMonth')?.addEventListener('click', () => {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    generateCalendar();
});

document.getElementById('nextMonth')?.addEventListener('click', () => {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    generateCalendar();
});

// Update Confirmation
function updateConfirmation() {
    document.getElementById('confirmPetName').textContent = document.getElementById('petName').value;
    document.getElementById('confirmOwner').textContent = document.getElementById('ownerName').value;
    document.getElementById('confirmService').textContent = document.getElementById('reason').value;
    document.getElementById('confirmEmail').textContent = document.getElementById('ownerEmail').value;
    document.getElementById('confirmPhone').textContent = document.getElementById('ownerPhone').value;
    
    if (selectedDate && selectedTime) {
        document.getElementById('confirmDateTime').textContent = 
            selectedDate.toLocaleDateString() + ' at ' + selectedTime;
    }
}

// Form Submit
document.getElementById('bookingForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Booking...</span>';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        document.querySelector('.booking-form-wrapper').style.display = 'none';
        document.getElementById('bookingSuccess').style.display = 'block';
    }, 1500);
});

function resetBooking() {
    location.reload();
}
