const API_URL = '/api/users';

const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');
const submitBtn = document.getElementById('submitBtn');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const userIdInput = document.getElementById('userId');

// Fetch and display users on load
document.addEventListener('DOMContentLoaded', fetchUsers);

userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = nameInput.value;
    const email = emailInput.value;
    const id = userIdInput.value;

    if (id) {
        await updateUser(id, { name, email });
    } else {
        await createUser({ name, email });
    }

    resetForm();
    fetchUsers();
});

async function fetchUsers() {
    try {
        const response = await fetch(API_URL);
        const users = await response.json();
        renderUsers(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        userList.innerHTML = '<p class="empty-state">Failed to load users. Is the server running?</p>';
    }
}

function renderUsers(users) {
    userList.innerHTML = '';

    if (users.length === 0) {
        userList.innerHTML = '<p class="empty-state">No users found. Add one above!</p>';
        return;
    }

    users.forEach(user => {
        const div = document.createElement('div');
        div.className = 'user-item';
        div.innerHTML = `
            <div class="user-info">
                <h3>${user.name}</h3>
                <p>${user.email}</p>
            </div>
            <div class="actions">
                <button class="btn-edit" onclick="editUser(${user.id}, '${user.name}', '${user.email}')">Edit</button>
                <button class="btn-delete" onclick="deleteUser(${user.id})">Delete</button>
            </div>
        `;
        userList.appendChild(div);
    });
}

async function createUser(user) {
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

async function updateUser(id, user) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
    } catch (error) {
        console.error('Error updating user:', error);
    }
}

async function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        fetchUsers();
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

function editUser(id, name, email) {
    userIdInput.value = id;
    nameInput.value = name;
    emailInput.value = email;
    submitBtn.textContent = 'Update User';
    submitBtn.style.backgroundColor = '#f59e0b'; // Amber for update

    // Scroll to form
    document.querySelector('.form-card').scrollIntoView({ behavior: 'smooth' });
}

function resetForm() {
    userForm.reset();
    userIdInput.value = '';
    submitBtn.textContent = 'Add User';
    submitBtn.style.backgroundColor = ''; // Reset to default
}
