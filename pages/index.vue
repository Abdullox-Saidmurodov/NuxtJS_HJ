<template>
    <div>
        Home Page
    </div>
    <pre>{{ user }}</pre>
    <NuxtLink to="/auth/login" >Login</NuxtLink>
    <NuxtLink to="/auth/register" >Register</NuxtLink>
    <NuxtLink to="/admin" >Admin</NuxtLink>
    <NuxtLink to="/admin/categories" >Categories</NuxtLink>

    <button @click="logout">Logout</button>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})
const { user, clear } = useUserSession()

const logout = async () => {
    await clear()
    navigateTo('/auth/login')
}
</script>

<style scoped>

</style>