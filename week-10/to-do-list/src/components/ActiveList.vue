<template>
  <div>
    <div v-if="!editMode">
      <ul class="list-group mb-0">
        <li
          class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
          style="background-color: #f4f6f7"
        >
          <input
            class="form-check-input me-1"
            type="checkbox"
            v-model="isCompleted"
          />
          <p class="m-2 flex-grow-1">{{ todo.task }}</p>
          <button @click="toggleEdit" class="btn btn-sm btn-secondary ms-auto">
            Edit
          </button>
          <button @click="removeTodo" class="btn btn-sm btn-danger ms-2">
            Hapus
          </button>
        </li>
      </ul>
    </div>

    <div v-else>
      <ToDoForm
        :todo="todo"
        :isEditMode="true"
        @updateToDo="handleUpdateToDo"
      />
    </div>
  </div>
</template>

<script>
import ToDoForm from "./ToDoForm.vue";

export default {
  name: "ActiveList",
  components: {
    ToDoForm,
  },
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isCompleted: {
      get() {
        return this.todo.isCompleted;
      },
      set(value) {
        this.$emit("onToggleIsCompleted", {
          value,
          id: this.todo.id,
        });
      },
    },
    editMode: function () {
      return this.todo.editMode;
    },
  },
  methods: {
    handleUpdateToDo: function (updatedTodo) {
      this.$emit("updateToDo", updatedTodo);
    },
    toggleEdit: function () {
      this.$emit("onToggleEdit", this.todo.id);
    },
    removeTodo: function () {
      this.$emit("onRemoveTodo", this.todo.id);
    },
  },
};
</script>
