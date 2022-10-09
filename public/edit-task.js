console.log("edit-task.js");

const taskIDDOM = document.querySelector('.task-edit-id');
const taskNameDOM = document.querySelector('.task-edit-name');
const taskCompletedDOM = document.querySelector('.task-edit-completed');
const editFormDOM = document.querySelector('.single-task-form');
const formAlertDOM = document.querySelector('.form-alert');
const editBtnDOM = document.querySelector('.task-edit-btn');

let tempName;

const params = window.location.search;
const id = new URLSearchParams(params).get("id");


const showTasks = async () => {
  try {
    const { data: { task } } = await axios.get(`/api/v1/tasks/${id}`);
    const { _id: taskID, completed, name } = task;

    taskIDDOM.textContent = taskID;

    taskNameDOM.value = name;
    tempName = name;

    if (completed) {
      taskCompletedDOM.checked = true;
    }
  } catch (error) {
    console.log(error);
  }
};

showTasks();

editFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log('click');
  editBtnDOM.textContent = 'Loading...';

  try {
    const taskName = taskNameDOM.value;
    const taskCompleted = taskCompletedDOM.checked;
    if (taskNameDOM.value != "") {
      const {
        data: { task },
      } = await axios.patch(`/api/v1/tasks/${id}`, {
        name: taskName,
        completed: taskCompleted,
      });

      const { _id: taskID, completed, name } = task;

      taskIDDOM.textContent = taskID;
      taskNameDOM.value = name;
      tempName = name;

      if (completed) {
        taskCompletedDOM.checked = true;
      }


      formAlertDOM.style.display = 'block';
      formAlertDOM.textContent = `success, edited task`;
      formAlertDOM.classList.add('text-success');

    }
    else {
      formAlertDOM.style.display = "block";
      formAlertDOM.textContent = `Enter valid detail`;
    }
  } catch (error) {
    console.log(error);
    taskNameDOM.value = tempName;
    formAlertDOM.style.display = 'block';
    formAlertDOM.innerHTML = `error,please try again`;
  }
  editBtnDOM.textContent = 'Edit';
  setTimeout(() => {
    formAlertDOM.style.display = 'none';
    formAlertDOM.classList.remove('text-success');
  }, 3000);

})


