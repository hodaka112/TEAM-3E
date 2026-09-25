const registrationForm = document.getElementById('registrationForm');
const accountType = document.getElementById('accountType');
const departmentGroup = document.getElementById('departmentGroup');
const department = document.getElementById('department');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const message = document.getElementById('message');

function updateDepartmentField() {
    const isEmployee = accountType.value === 'employee';

    departmentGroup.hidden = !isEmployee;
    department.disabled = !isEmployee;
    department.required = isEmployee;

    if (!isEmployee) {
        department.value = '';
    }
}

accountType.addEventListener('change', updateDepartmentField);

registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    message.textContent = '';

    if (password.value !== confirmPassword.value) {
        message.textContent = 'Passwords do not match.';
        confirmPassword.focus();
        return;
    }

    try {
        const response = await fetch(registrationForm.action, {
            method: registrationForm.method,
            body: new FormData(registrationForm),
            headers: {
                Accept: 'application/json',
            },
        });
        const result = await response.json();

        message.textContent = result.message || 'Unable to complete registration.';

        if (response.ok && result.success) {
            registrationForm.reset();
            updateDepartmentField();
        }
    } catch (error) {
        message.textContent = 'Unable to complete registration. Please try again.';
    }
});

updateDepartmentField();
