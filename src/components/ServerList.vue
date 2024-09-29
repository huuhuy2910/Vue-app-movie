<template>
  <div class="server-list">
    <h2>Chọn server:</h2>
    <button
      v-for="server in servers"
      :key="server.name"
      @click="toggleServer(server)"
      :class="{ 'active': isSelected(server) }"
      class="server-button"
      :aria-pressed="isSelected(server)"
    >
      {{ server.name }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    servers: {
      type: Array,
      required: true,
    },
    selectedServers: { // Chọn các server đã được chọn
      type: Array,
      required: false,
      default: () => [],
    },
  },
  methods: {
    toggleServer(server) {
      const index = this.selectedServers.findIndex(s => s.name === server.name);
      if (index === -1) {
        // Nếu server chưa được chọn, thêm vào danh sách
        this.$emit('server-selected', [...this.selectedServers, server]);
      } else {
        // Nếu server đã được chọn, bỏ khỏi danh sách
        this.$emit('server-selected', this.selectedServers.filter(s => s.name !== server.name));
      }
    },
    isSelected(server) {
      return this.selectedServers.some(s => s.name === server.name);
    },
  },
};
</script>


<style scoped>
.server-list {
  margin-top: 20px;
}

.server-button {
  margin: 5px;
  padding: 10px 15px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.server-button.active {
  background-color: #4CAF50;
  color: white;
}

.server-button:hover {
  background-color: #d0d0d0;
}
</style>
