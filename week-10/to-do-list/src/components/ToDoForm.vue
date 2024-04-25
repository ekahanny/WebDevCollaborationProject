<template>
  <form
    class="d-flex justify-content-center align-items-center mb-4"
    @submit.prevent="submit"
  >
    <div class="form-outline flex-fill">
      <input
        type="text"
        id="addTask"
        class="form-control"
        placeholder="Add New Task..."
        required
        v-model="task"
      />
    </div>
    <button type="submit" class="btn btn-info ms-2">
      {{ isEditMode ? "Edit" : "+" }}
    </button>
  </form>
</template>

<script>
export default {
  name: "ToDoForm",
  data() {
    return {
      task: "",
    };
  },
  props: {
    todo: {
      type: Object,
      default: () => ({}),
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    if (this.isEditMode) {
      this.task = this.todo.task;
    }
  },
  methods: {
    submit: function () {
      if (this.isEditMode) {
        this.emitUpdateToDo();
      } else {
        this.emitToDo();
      }
      this.task = "";
    },
    emitUpdateToDo: function () {
      // Mengubah emit ke updateToDo agar sesuai dengan penanganannya di ActiveList.vue
      this.$emit("updateToDo", {
        task: this.task,
        id: this.todo.id,
        isCompleted: this.todo.isCompleted,
        editMode: false, // Mengubah mode edit kembali menjadi false setelah diubah
      });
    },
    emitToDo: function () {
      // Mengubah emit ke newToDo agar sesuai dengan penanganannya di App.vue
      this.$emit("newToDo", {
        task: this.task,
        id: `$todo_${Math.random() * 1000}`,
        isCompleted: false,
        editMode: false,
      });
    },
  },
};
</script>
