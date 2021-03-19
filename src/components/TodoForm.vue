<template>
  <div class="form-group d-flex w-50 justify-content-around">
    <div class="w-75">
      <input
        class="form-control rounded-0"
        @keypress="inputPress"
        type="text"
        v-model="todo"
        id="todo-input"
        placeholder="Item Content"
      />
    </div>
    <button @click="addClick" class="btn btn-primary w-25 rounded-0">
      Add
    </button>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";

export default {
  name: "todo-form",
  setup() {
    const todoStore = useStore();
    let todo = ref("");

    // Add item and reset input
    function addItem() {
      if (todo.value.length === 0) return;
      todoStore.commit("add", todo.value);
      todo.value = "";
    }

    // Handle button click to add item when 'Add' is pressed
    function addClick() {
      addItem();
    }

    // Handle input keypresses to add item when 'Enter' is pressed
    function inputPress(e) {
      if (e.key === "Enter") {
        addItem();
      }
    }

    return { addClick, todo, inputPress };
  },
};
</script>