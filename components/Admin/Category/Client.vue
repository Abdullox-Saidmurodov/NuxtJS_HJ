<template>
    <div class="flex items-center justify-between">
        <NuxtLink to="/admin/categories/new">
            <Button>
                <Icon name="lucide:plus" class="mr-2 h-4 w-4"></Icon>
                Add New
            </Button>
        </NuxtLink>
    </div>
    <DataTable v-if="status !== 'pending'" :columns="columns" column-to-search="name" :data="categories ? categories : []"></DataTable>
</template>

<script setup lang="ts">
// @ts-ignore
import { columns } from '@/components/Admin/Category/column'
const { data: categories, status } = await useFetch('/api/admin/categories', {
    key: 'categories',
    transform: (categories) => {
        // @ts-ignore
        return categories.map(item => {
            return {
                id: item.id,
                name: item.name,
                createdAt: useDateFormat(new Date(item.createdAt), 'MMMM D, YYYY').value,
            }
        })
    }
})

</script>

<style scoped>

</style>