const url = "https://demo-api.siit.ro/api/students";

const submit_button = document.querySelector("#submit");

const student_form_name = document.querySelector("#name");
const student_form_email = document.querySelector("#email");
const student_form_phone = document.querySelector("#phone");

const student_table = document.querySelector("table");

const student_table_body = student_table.querySelector("tbody") || student_table;

const search_id = document.querySelector("#search_student")
const display_id = document.querySelector(".display_table")
const search_btn = document.querySelector(".search_button")
// Display all the students in the API

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((student) => {
      const student_row = document.createElement("tr");

      const student_id = document.createElement("td");
      student_id.textContent = student.id;

      const student_name = document.createElement("td");
      student_name.textContent = student.name;

      const student_email = document.createElement("td");
      student_email.textContent = student.email;

      const student_phone = document.createElement("td");
      student_phone.textContent = student.phone;

      const student_edit_btn_row = document.createElement("td");
      const student_edit_btn = document.createElement("button");
      student_edit_btn.classList.add("edit");
      student_edit_btn.textContent = "Edit";
      student_edit_btn_row.append(student_edit_btn);

      const edit_students = () => {
        student_form_name.value = student.name,
        student_form_email.value = student.email,
        student_form_phone.value = student.phone

        submit_button.textContent = "Update"

        const updated_submit_button = submit_button.cloneNode(true);
        submit_button.replaceWith(updated_submit_button);

        updated_submit_button.addEventListener("click", () => {

          const uptated_student_template = {
            name: student_form_name.value,
            email: student_form_email.value,
            phone: student_form_phone.value,
          }

          fetch(`${url}/${student.id}`, {
            method:"PUT",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(uptated_student_template)
          })
            .then(res => res.json())
            .then(updated_data => {

              student_name.textContent = updated_data.name
              student_email.textContent = updated_data.email
              student_phone.textContent = updated_data.phone
    
              student_form_name.value = ""
              student_form_email.value = ""
              student_form_phone.value = ""
    
              updated_submit_button.textContent = "Submit"
            })
        })

      }

      student_edit_btn.addEventListener("click", edit_students)

      const student_delete_btn_row = document.createElement("td");
      const student_delete_btn = document.createElement("button");
      student_delete_btn.classList.add("delete");
      student_delete_btn.textContent = "Delete";
      student_delete_btn_row.append(student_delete_btn);

      student_delete_btn.addEventListener("click", () => {
        delete_student(student.id, student_row);
      });

      student_row.append(
        student_id,
        student_name,
        student_email,
        student_phone,
        student_edit_btn_row,
        student_delete_btn_row
      );

      student_table_body.append(student_row);
    });
  });

// Add new students to the API

function add_student(event) {
  event.preventDefault();

  const student_template = {
    name: student_form_name.value,
    email: student_form_email.value,
    phone: student_form_phone.value,
  };

  const request = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(student_template),
  };

  fetch(url, request)
    .then((res) => res.json())
    .then((new_student) => {
      display_new_row(new_student);
    });

  student_form_name.value = "";
  student_form_email.value = "";
  student_form_phone.value = "";
}

submit_button.addEventListener("click", add_student);

// Delete student in API

function delete_student(id, student_row) {
  const student_id = `${url}/${id}`;

  const request = {
    method: "DELETE",
  };

  fetch(student_id, request);

  student_row.remove();
}

function display_new_row(student) {
  const student_table_row = document.createElement("tr");

  const student_table_id = document.createElement("td");
  student_table_id.textContent = `${url}/${id}`;

  const student_table_name = document.createElement("td");
  student_table_name.textContent = student.name;

  const student_table_email = document.createElement("td");
  student_table_email.textContent = student.email;

  const student_table_phone = document.createElement("td");
  student_table_phone.textContent = student.phone;

  const student_table_row_edit_btn = document.createElement("td");
  const student_table_edit_btn = document.createElement("button");
  student_table_edit_btn.classList.add("edit");
  student_table_edit_btn.textContent = "Edit";
  student_table_row_edit_btn.append(student_table_edit_btn);

  const student_table_row_delete_btn = document.createElement("td");
  const student_table_delete_btn = document.createElement("button");
  student_table_delete_btn.classList.add("delete");
  student_table_delete_btn.textContent = "Delete";
  student_table_row_delete_btn.append(student_table_delete_btn);

  student_table_row.append(
    student_table_id,
    student_table_name,
    student_table_email,
    student_table_phone,
    student_table_row_edit_btn,
    student_table_row_delete_btn
  );

  student_table_body.append(student_table_row);
}


// Search for ID

function search_for_student() {
  const student_id_value = search_id.value

  fetch(`${url}/${student_id_value}`)
    .then(res => res.json())
    .then(data => {
      const person_id_name = document.createElement("p")
      person_id_name.textContent = `Name: ${data.name}`

      const person_id_email = document.createElement("p")
      person_id_email.textContent = `Email: ${data.email}`

      const person_id_phone = document.createElement("p")
      person_id_phone.textContent = `Phone: ${data.phone}`

      display_id.append(person_id_name, person_id_email, person_id_phone)
    })

    search_id.value = ""
}

search_btn.addEventListener("click", search_for_student)


