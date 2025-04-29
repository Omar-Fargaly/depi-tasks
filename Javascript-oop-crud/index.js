// i don't quite get why would we use an object oriented solution for something like this but anyways the solution will be something like:
class CourseManager {
  constructor() {
    this.courses = [];
    this.editIndex = -1;
    this.form = document.querySelector("form");
    this.nameInput = this.form.querySelector("input[type='text']");
    this.descriptionInput = this.form.querySelector("textarea");
    this.submitButton = this.form.querySelector("button[type='submit']");
    this.tbody = document.querySelector("tbody");
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    this.tbody.addEventListener("click", (e) => this.handleTableClick(e));
  }

  handleSubmit(e) {
    e.preventDefault();
    const name = this.nameInput.value.trim();
    const description = this.descriptionInput.value.trim();
    if (!name || !description) return;

    if (this.editIndex === -1) {
      this.courses.push({ name, description });
    } else {
      this.courses[this.editIndex] = { name, description };
      this.editIndex = -1;
      this.submitButton.textContent = "Submit";
    }
    this.form.reset();
    this.renderTable();
  }

  handleTableClick(e) {
    if (e.target.classList.contains("edit-btn")) {
      const index = e.target.dataset.index;
      const course = this.courses[index];
      this.nameInput.value = course.name;
      this.descriptionInput.value = course.description;
      this.editIndex = index;
      this.submitButton.textContent = "Update";
    }

    if (e.target.classList.contains("delete-btn")) {
      const index = e.target.dataset.index;
        this.courses.splice(index, 1);
        this.renderTable();
    }
  }

  renderTable() {
    this.tbody.innerHTML = "";
    this.courses.forEach((course, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="px-4 py-2 border-b">${index + 1}</td>
        <td class="px-4 py-2 border-b">${course.name}</td>
        <td class="px-4 py-2 border-b">${course.description}</td>
        <td class="px-4 py-2 border-b">
          <button class="edit-btn text-blue-500 mr-2" data-index="${index}">Edit</button>
          <button class="delete-btn text-red-500" data-index="${index}">Delete</button>
        </td>
      `;
      this.tbody.appendChild(row);
      console.log(courses);
    });
  }
}
window.addEventListener("DOMContentLoaded", () => new CourseManager());
