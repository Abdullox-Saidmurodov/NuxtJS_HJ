<template>
    <div class="mb-8">
        <h3 class="text-lg font-semibold">{{ name }}</h3>
        <hr class="my-4">
        <div class="flex-wrap gap-2">
            <Badge v-for="(filter, i) in data" key="i"
                   :variant="route.query[valueKey] === filter.id ? 'secondary' : 'outline'"
                   @click="() => onClick(filter.id)" class="cursor-pointer px-2 py-2 font-medium">
                {{ filter.name }}
            </Badge>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Category, Color, Size } from '@prisma/client';
import type { RouteParams } from '~/types';

interface FilterProps {
    data: (Size | Color | Category)[]
    name: string
    valueKey: string
}
const props = defineProps<FilterProps>()
const route = useRoute()
const router = useRouter()
const onClick = (id: string) => {
    const query = new URLSearchParams(route.query as RouteParams)
    if(query.get(props.valueKey) === id) {
        query.delete(props.valueKey)
    } else {
        query.set(props.valueKey, id)
    }
    router.push({
        path: route.path,
        query: Object.fromEntries(query.entries())
    })
}
</script>

<style scoped>

</style>