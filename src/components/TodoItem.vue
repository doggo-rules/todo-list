<template>
  <div
    class="list-group-item d-flex justify-content-between align-items-center w-100"
  >
    <div class="content" role="button" @click="complete">
      <li class="list-unstyled">
        <s v-if="item.completed">{{ item.content }}</s>
        <span v-else>{{ item.content }}</span>
      </li>
    </div>
    <button @click="deleteItem" class="btn btn-primary">Delete</button>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  props: {
    item: {
      required: true,
    },
  },
  name: "todo-item",
  setup(props) {
    const todoStore = useStore();

    // Delete current item
    function deleteItem() {
      todoStore.commit("remove", props.item.id);
    }

    // Complete current item
    function complete() {
      todoStore.commit("complete", props.item.id);
    }

    return {
      deleteItem,
      complete,
    };
  },
};
</script>