$(document).ready(function () {
  let courses = [];
  let editIndex = -1;

  function renderTable() {
    const tbody = $("tbody");
    tbody.empty();
    courses.forEach((course, index) => {
      const row = `
        <tr class="border-b">
        <td class="px-4 py-2 border-b">${index + 1}</td>
        <td class="px-4 py-2 border-b">${course.name}</td>
        <td class="px-4 py-2 border-b">${course.description}</td>
        <td class="px-4 py-2 border-b">
          <button class="edit-btn text-blue-500 mr-2" data-index="${index}">Edit</button>
          <button class="delete-btn text-red-500" data-index="${index}">Delete</button>
        </td>
        </tr>`;
      tbody.append(row);
    });
  }

  $("form").on("submit", function (e) {
    e.preventDefault();
    const name = $("input[type='text']").val().trim();
    const description = $("textarea").val().trim();

    if (!name || !description) {
      alert("A field is empty");
      return;
    }

    if (editIndex === -1) {
      courses.push({ name, description });
    } else {
      courses[editIndex] = { name, description };
      editIndex = -1;
      $("button[type='submit']").text("Submit");
    }

    $(this).trigger("reset");
    renderTable();
  });

  $("tbody").on("click", ".edit-btn", function () {
    const index = $(this).data("index");
    const course = courses[index];
    $("input[type='text']").val(course.name);
    $("textarea").val(course.description);
    editIndex = index;
    $("button[type='submit']").text("Update");
  });

  $("tbody").on("click", ".delete-btn", function () {
    const index = $(this).data("index");
      courses.splice(index, 1);
      renderTable();
  });
});
