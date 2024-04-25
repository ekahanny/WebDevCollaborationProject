<template>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div class="card">
          <div class="card-body p-5">
            <h1 class="text-center">TO DO LIST</h1>
            <p v-if="completedTodos > 0" class="text-center">
              Completed Todos: {{ completedTodos }}
            </p>
            <!-- menjalankan event/emit -->
            <ToDoForm @newToDo="handleNewToDo" />
            <ActiveList
              v-for="todo in todoList"
              :key="todo.id"
              :todo="todo"
              @onToggleIsCompleted="handleToggleIsChecked"
              @onToggleEdit="handleToggleEdit"
              @updateToDo="handleUpdateToDo"
              @onRemoveTodo="handleRemoveTodo"
            ></ActiveList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToDoForm from "./components/ToDoForm.vue";
import ActiveList from "./components/ActiveList.vue";

export default {
  name: "App",
  components: {
    ToDoForm,
    ActiveList,
  },
  data() {
    return {
      todoList: [],
    };
  },
  computed: {
    completedTodos: function () {
      return this.todoList.filter((todo) => todo.isCompleted).length;
    },
  },
  methods: {
    handleNewToDo: function (ToDo) {
      this.todoList.push(ToDo);
    },
    handleToggleIsChecked: function ({ value, id }) {
      const todo = this.findTodo(id);
      todo.isCompleted = value;
    },
    findTodo(id) {
      return this.todoList.find((todo) => todo.id === id);
    },
    handleRemoveTodo: function (id) {
      const confirm = window.confirm("You sure to delete this?");
      if (confirm) {
        this.todoList = this.todoList.filter((todo) => todo.id !== id);
      }
    },
    handleToggleEdit: function (id) {
      const todo = this.findTodo(id);
      todo.editMode = !todo.editMode;
    },
    handleUpdateToDo: function (updatedTodo) {
      this.todoList = this.todoList.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }
        return todo;
      });
    },
  },
};
</script>

<style>
h1 {
  font-family: "Newsreader", serif;
}
</style>
