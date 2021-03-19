<template>
  <ul class="pagination mt-3">
    <li class="page-item" @click="previous" role="button">
      <a class="page-link">&laquo;</a>
    </li>
    <li class="page-item">
      <p class="page-link">
        {{ page === 0 ? 1 : page + 1 }} /
        {{ totalPage === 0 ? 1 : totalPage }}
      </p>
    </li>
    <li class="page-item" @click="next" role="button">
      <a class="page-link">&raquo;</a>
    </li>
  </ul>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  name: "pagination",
  setup() {
    const todoStore = useStore();
    const pageLength = computed(() => todoStore.state.pageLength);
    let page = computed(() => todoStore.state.page);

    // Calculate total page count
    const totalPage = computed(() => {
      return Math.ceil(todoStore.state.todos.length / pageLength.value);
    });

    // Goes to the previous page
    function previous() {
      if (page.value > 0) todoStore.commit("prevPage");
    }

    // Goes to the next page
    function next() {
      if (page.value < totalPage.value - 1) todoStore.commit("nextPage");
    }

    return {
      previous,
      next,
      page,
      totalPage,
    };
  },
};
</script>