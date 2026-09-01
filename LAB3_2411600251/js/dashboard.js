document.addEventListener('DOMContentLoaded', function() {
    // 1. Guard Statement checking authorization
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
        return;
    }

    const username = localStorage.getItem('user') || 'User';
    
    // Run core dynamic dashboard scripts
    updateGreeting(username);
    updateStatistics();
    populateActivityTable();
    setupLogout();
});

// Update standard dynamic greetings depending on internal system clock
function updateGreeting(username) {
    const greetingElement = document.getElementById('greeting');
    if (!greetingElement) return;

    const hour = new Date().getHours();
    let timeOfDay = 'Good Night';

    if (hour >= 5 && hour < 12) timeOfDay = 'Good Morning';
    else if (hour >= 12 && hour < 17) timeOfDay = 'Good Afternoon';
    else if (hour >= 17 && hour < 21) timeOfDay = 'Good Evening';

    greetingElement.textContent = `${timeOfDay}, ${username}!`;
}

// Push system object data arrays to metrics layout sections 
function updateStatistics() {
    const financialStats = [
        { title: 'Total Balance', value: '$12,450.85' },
        { title: 'Monthly Income', value: '$4,200.00' },
        { title: 'Monthly Expenses', value: '$1,850.20' },
        { title: 'Savings Target Achieved', value: '68%' }
    ];

    financialStats.forEach((stat, index) => {
        const titleEl = document.getElementById(`stat${index + 1}-title`);
        const valueEl = document.getElementById(`stat${index + 1}-value`);
        if (titleEl) titleEl.textContent = stat.title;
        if (valueEl) valueEl.textContent = stat.value;
    });
}

// Generate operational layout logs seamlessly using dynamic element loops
function populateActivityTable() {
    const tableBody = document.getElementById('activityTableBody');
    if (!tableBody) return;

    const transactions = [
        { date: '2026-08-31', activity: 'Salary Deposit (Direct Transfer)', status: 'Success' },
        { date: '2026-08-30', activity: 'Electric & Utility Bill Payment', status: 'Pending' },
        { date: '2026-08-28', activity: 'Grocery Shopping Outpost Store', status: 'Success' },
        { date: '2026-08-25', activity: 'Gym Subscription Autopay Deficit', status: 'Failed' }
    ];

    tableBody.innerHTML = '';

    transactions.forEach(tx => {
        const row = document.createElement('tr');
        let badgeStyle = 'bg-secondary';
        
        if (tx.status === 'Success') badgeStyle = 'bg-success';
        else if (tx.status === 'Pending') badgeStyle = 'bg-warning text-dark';
        else if (tx.status === 'Failed') badgeStyle = 'bg-danger';

        row.innerHTML = `
            <td>${tx.date}</td>
            <td>${tx.activity}</td>
            <td><span class="badge ${badgeStyle}">${tx.status}</span></td>
        `;
        tableBody.appendChild(row);
    });
}

// Handle layout access drops 
function setupLogout() {
    const logoutActions = [document.getElementById('logoutBtn'), document.getElementById('logoutLink')];
    
    logoutActions.forEach(element => {
        if (element) {
            element.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('user');
                window.location.href = 'index.html';
            });
        }
    });
}