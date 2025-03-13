<template>
    <div class="flex items-center justify-between">
        <Heading title="Categories" description="Manage Categories">
            
        </Heading>
        <NuxtLink to="/admin/categories/new">
            <Button>
                <Icon name="lucide:plus" class="mr-2 h-4 w-4"></Icon>
                Add New
            </Button>
        </NuxtLink>
    </div>
    <!-- <pre>
        {{ data }}
    </pre> -->
    <!-- @vue-expect-error -->
    <DataTable v-if="status !== 'pending'" :columns="columns" column-to-search="name" :data="categories ? categories : []"></DataTable>
</template>

<script setup lang="ts">
// @ts-ignore
import { columns } from '@/components/Admin/Category/Column'
const { data: categories, status } = await useFetch('/api/admin/categories', {
    key: 'categories'
})

</script>

<style scoped>

</style>