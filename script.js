//          https://jsonplaceholder.typicode.com
const URL = "http://localhost:8000";
const tbody = document.querySelector(".studentsTable tbody");
const postForm = document.querySelector('.post_form')
const addStudentBtn = document.querySelector('.add_student')

const getStudents = () => {
  fetch(`${URL}/students`)
    .then((response) => response.json())
    .then((data) => renderStudents(data));
};

const deleteStudent = (studentID) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  };

  fetch(`${URL}/students/${studentID}`, options)
    .then(() => getStudents());
};

const renderStudents = (students) => {
  tbody.innerHTML = "";
  students.forEach((student, index) => {
    let tr = `
      <tr>
        <td>${index + 1}</td>
        <td>${student.name}</td>
        <td>${student.gender}</td>
        <td>${student.age}</td>
        <td>
          <button onclick="deleteStudent(${student.id})">Delete</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += tr;
  });
};


getStudents();

const postNewStudent = (data) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  }
  fetch(`${URL}/students`, options)
    .then(() => getStudents())
}

const visibleAddForm = () => {
  if(postForm.classList.contains('active')) {
    const nameValue = document.querySelector('#name').value;
    const genderValue = document.querySelector('#gender').value;
    const ageValue = document.querySelector('#age').value;
    const newStudent = {
      id: new Date().getSeconds(),
      name: nameValue,
      gender: genderValue,
      age: ageValue
    }
    postNewStudent(newStudent)
  } else{
    postForm.classList.add('active')
  }
}

addStudentBtn.addEventListener('click', (event) => {
  event.preventDefault();
  visibleAddForm()
})

console.log("new log 2")