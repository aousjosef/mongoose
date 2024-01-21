const api = "http://localhost:5000/courses";

async function coursesArray() {
  const response = await fetch(api);
  const courses = await response.json();
  return courses;
}

async function loadCourseAndUpdateDom() {
  const FetchedcoursesArray = await coursesArray();
  const listEl = document.getElementById("list");
  FetchedcoursesArray.forEach((course) => {
    listEl.innerHTML += `<li>${course.courseName} <button onclick="deleteCourseById('${course._id}')">Radera</button></li> <br> `;
  });
}

async function postCourse(data) {
  try {
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Course successfully posted:", result);
    location.reload();
  } catch (error) {
    console.error("Error posting course:", error);
  }
}

function submitCourse() {
  const id = document.getElementById("id").value;
  const courseId = document.getElementById("courseId").value;
  const courseName = document.getElementById("courseName").value;
  const coursePeriod = document.getElementById("coursePeriod").value;

  if (!id || !courseId || !courseName || !coursePeriod) {
    alert("All fields are required. Please fill them in.");
    return;
  }

  const courseData = {
    _id: parseInt(id),
    courseId: courseId,
    courseName: courseName,
    coursePeriod: coursePeriod,
  };

  postCourse(courseData);
}

async function deleteCourseById(courseId) {
  try {
    const response = await fetch(`${api}/${courseId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log(
      `Course with ID ${courseId} successfully deleted:`,
      result
    );

    // Reload the page upon successful delete
    location.reload();
  } catch (error) {
    console.error(`Error deleting course with ID ${courseId}:`, error);
  }
}

loadCourseAndUpdateDom();