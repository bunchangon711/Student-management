document.addEventListener('DOMContentLoaded', function() {
    const studentForm = document.getElementById('studentForm');
    const studentTable = document.getElementById('studentTable');
    function populateFormForEdit(row) {
        const cells = row.getElementsByTagName('td');
        document.getElementById('studentId').value = cells[0].innerText;
        document.getElementById('studentName').value = cells[1].innerText;
        document.getElementById('studentBirthdate').value = cells[2].innerText;
        document.getElementById('studentClass').value = cells[3].innerText;
        document.getElementById('studentGPA').value = cells[4].innerText;
    }

    studentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const studentId = document.getElementById('studentId').value;
        const studentName = document.getElementById('studentName').value;
        const studentBirthdate = document.getElementById('studentBirthdate').value;
        const studentClass = document.getElementById('studentClass').value;
        const studentGPA = document.getElementById('studentGPA').value;
    
        if (studentExists(studentId)) {
            // Update data when ID exist
            if (updateStudentData(studentId, { name: studentName, birthdate: studentBirthdate, class: studentClass, gpa: studentGPA })) {
                alert('Student data updated successfully.');
            } else {
                alert('Student data could not be updated.');
            }
        } else {
            // Add new student when ID not exist
            const newRow = studentTable.insertRow();
            newRow.innerHTML = `
                <td>${studentId}</td>
                <td>${studentName}</td>
                <td>${studentBirthdate}</td>
                <td>${studentClass}</td>
                <td>${studentGPA}</td>
                <td><button class="edit-btn">Edit</button></td>
            `;
            newRow.querySelector('.edit-btn').addEventListener('click', function() {
                populateFormForEdit(newRow);
            });
            alert('Student data saved successfully.');
        }
    });

    //Check if a student with ID exists
    function studentExists(id) {
        const rows = studentTable.getElementsByTagName('tr');
        for (let i =  1; i < rows.length; i++) { // Start from  1 to skip the header row
            const cells = rows[i].getElementsByTagName('td');
            if (cells[0].innerText === id) {
                return true;
            }
        }
        return false;
    }
    
    //Updates student's data if the ID already exists
    function updateStudentData(id, newData) {
        const rows = studentTable.getElementsByTagName('tr');
        for (let i =  1; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            if (cells[0].innerText === id) {
                cells[1].innerText = newData.name;
                cells[2].innerText = newData.birthdate;
                cells[3].innerText = newData.class;
                cells[4].innerText = newData.gpa;
                return true;
            }
        }
        return false;
    }
});