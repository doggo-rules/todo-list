const { createStore } = require("vuex");

// Generate a (random enough) id
function generateId() {
  return Math.floor(Math.random() * Date.now()).toString(16);
}

// Todo item class
export class Todo {
  constructor(content = "") {
    this.id = generateId();
    this.content = content;
    this.completed = false;
  }
}

export default createStore({
  state: {
    todos: [],
    pageLength: 7,
    page: 0,
  },
  mutations: {
    // Add Task
    add(state, todo) {
      state.todos.push(new Todo(todo));

      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    // Remove Task
    remove(state, id) {
      state.todos = state.todos.filter((i) => i.id !== id);

      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    // Complete Task
    complete(state, id) {
      state.todos = state.todos.map((i) => {
        if (i.id === id) {
          i.completed = !i.completed;
          return i;
        } else {
          return i;
        }
      });

      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    // Add Multiple Tasks (to load data from localStorage)
    addMany(state, todos) {
      state.todos.push(...todos);
    },
    // Goes to next page
    nextPage(state) {
      state.page++;
    },
    // Goes to previous page
    prevPage(state) {
      state.page--;
    },
  },
  actions: {
    // load todolist from localStorage
    loadLocal({ commit }) {
      if (!localStorage.getItem("todos")) return;

      const localData = JSON.parse(localStorage.getItem("todos"));

      commit("addMany", localData);
    },
  },
});
