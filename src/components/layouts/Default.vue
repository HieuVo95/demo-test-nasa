<template>
    <div class="wrapper">
        <div class="sidebar">
            <h2>Nasa Image</h2>
            <ul>
                <li :class="$route.path === '/dashboard' && 'active'" ><router-link to="/dashboard"><i class="fas fa-home"></i>Dashboard</router-link></li>
                <li :class="$route.path === '/all-data' && 'active'"><router-link to="/all-data"><i class="fas fa-border-all"></i>All Data</router-link></li>
                <li :class="$route.path === '/liked-data' && 'active'"><router-link to="/liked-data"><i class="fas fa-thumbs-up"></i>Liked Data</router-link></li>
                <li :class="$route.path === '/removed-data' && 'active'"><router-link to="/removed-data"><i class="fas fa-trash-alt"></i>Removed Data</router-link></li>
                <li><a href="javascript:;" @click="clearStorage"><i class="fas fa-window-close"></i>Clear Storage</a></li>
            </ul>
        </div>
        <div class="main-content">
            <div class="header">{{ $route.meta.title }}</div>
            <div class="body-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        clearStorage() {
            this.$store.commit("clearStorage");
            if (this.$route.path !== "/dashboard")
                this.$router.push("/dashboard");
        }
    }
}
</script>