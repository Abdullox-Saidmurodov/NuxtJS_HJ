<template>
    <div class="space-y-4">
        <h3 class="font-bold text-3xl">
            {{ title }}
        </h3>
        <!-- No Result -->
         <NoResults v-if="!items"></NoResults>
        <div class="grid grid-cols-3 gap-8">
            <!-- Product Card -->
             <template v-if="!isLoading">
                <ProductCard v-for="item in items" :key="item.id" :data="item"></ProductCard>
             </template>
            <!-- Loader -->
             <template v-else>
                <CardLoader v-for="i in 3" :key="i"></CardLoader>s
             </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SafeProduct } from '~/types'
defineProps<{
    title: string;
    items: SafeProduct[]
    isLoading: boolean
}>()
</script>

<style scoped>

</style>