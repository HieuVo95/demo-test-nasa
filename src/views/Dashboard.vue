<template>
  <div class="list-card-dashboard">
    <div class="row">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">All Data</h5>
          <p class="card-text">{{ totalAllData || 0 }}</p>
          <router-link to="/all-data" class="btn btn-go">Go to list</router-link>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Liked Data</h5>
          <p class="card-text">{{ likedData && likedData.length || 0 }}</p>
          <router-link to="/liked-data" class="btn btn-go">Go to list</router-link>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Removed Data</h5>
          <p class="card-text">{{ removeData && removeData.length || 0 }}</p>
          <router-link to="/removed-data" class="btn btn-go">Go to list</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {

    };
  },
  computed: {
    totalAllData() {
      return this.$store.state.totalAllData;
    },
    likedData() {
      return this.$store.state.likedData;
    },
    removeData() {
      return this.$store.state.removeData;
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-flow: wrap;
}
.card {
  width: 20%;
  border: none;
  border-radius: 15px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  transition: 0.5s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  }
}
.btn-go {
  color: #fff;
  background: linear-gradient(to right, #ff416c, #ff4b2b);
}
</style>
