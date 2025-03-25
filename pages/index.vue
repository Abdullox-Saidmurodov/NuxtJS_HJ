<template>
     <Hero></Hero>
     <div class="mx-auto w-full max-w-5xl py-16 sm:py-32">
        <div class="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <!-- @vue-expect-error -->
            <ProductList :items="product" title="Featured Products" :is-loading="status === 'pending'"></ProductList>
        </div>
     </div>
</template>

<script setup lang="ts">
import type { SafeProduct } from '~/types'

const { data: product, status, } = await useFetch<SafeProduct[]>(`/api/admin/products?isFeatured=true`, {
    lazy: true
})
</script>

<style scoped>

</style>