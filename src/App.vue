<template>
  <div class="d-flex flex-column align-items-center mt-3">
    <todo-form />
    <div class="list-group w-50 rounded-0" v-if="items.length > 0">
      <todo-item :item="item" :key="item.id" v-for="item of items" />
    </div>
    <div class="not-found" v-else>
      <h3>No items added yet!</h3>
    </div>
    <pagination />
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";
import Pagination from "./components/Pagination";

export default {
  setup() {
    const todoStore = useStore();
    const pageLength = computed(() => todoStore.state.pageLength);
    let page = computed(() => todoStore.state.page);

    // Get a slice of todos based on pageLength and page
    const items = computed(() => {
      let start = page.value * pageLength.value;
      let end = page.value * pageLength.value + pageLength.value;

      return todoStore.state.todos.slice(start, end);
    });

    // Load todolist from localStorage on page load
    function onMount() {
      todoStore.dispatch("loadLocal");
    }

    onMounted(onMount);

    return {
      items,
    };
  },
  components: { TodoItem, TodoForm, Pagination },
};
</script>