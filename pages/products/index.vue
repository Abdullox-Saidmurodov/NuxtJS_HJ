<template>
    <div>
        <div class="mx-auto max-x-6xl w-full my-4">
            <div class="px-4 pb-24">
                <div class="lg:grid lg:grid-cols-5 lg-gap-x-8">
                    <!-- Mobile Filter -->
                    <MobileFilter :sizes="sizes" :colors="colors" :categories="categories"></MobileFilter>
                    <div class="hidden lg:block">
                    <!-- Filters -->
                        <Filter valueKey="sizeId" name="Sizes" :data="sizes" />
                        <Filter valueKey="colorId" name="Colors" :data="colors" />
                        <Filter valueKey="categoryId" name="Categories" :data="categories" />
                    </div>
                    <div class="mt-6 lg:col-span-4 lg:mt-0">
                        <!-- No Result -->
                         <!-- <NoResults v-if="!product || !product.length"></NoResults> -->
                         <NoResults v-if="status !=='pending' && (!product || !product.length)"></NoResults>
                        <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            <!-- Product Card -->
                             <template v-if="status !=='pending' && product && product.length">
                                <ProductCard v-for="item in product" :key="item.id" :data="item"></ProductCard>
                             </template>
                            <!-- Loader -->
                             <template v-else>
                                <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                    <CardLoader v-for="i in 6" :key="i"></CardLoader>s
                                </div>
                             </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SafeProduct, RouteParams } from '~/types';

const route = useRoute()
const colorId = computed(() => (route.query as RouteParams).colorId)
const sizeId = computed(() => (route.query as RouteParams).sizeId)
const categoryId = computed(() => (route.query as RouteParams).categoryId)
const { data: product, status, } = await useFetch<SafeProduct[]>('/api/admin/products', {
    lazy: true,
    query: {
        categoryId: categoryId,
        sizeId: sizeId,
        colorId: colorId
    }
})
const { data: cachedSizes } = useNuxtData('sizes')
const { data: sizes, status: sizeStatus } = await useFetch('/api/admin/sizes', {
    key: 'sizes',
    default() {
        return cachedSizes.value
    }
})
const { data: cachedColors } = useNuxtData('colors')
const { data: colors, status: colorStatus } = await useFetch('/api/admin/colors', {
    key: 'colors',
    default() {
        return cachedColors.value
    }
})
const { data: cachedCategories } = useNuxtData('categories')
const { data: categories, status: categoryStatus } = await useFetch('/api/admin/categories', {
    key: 'categories',
    default() {
        return cachedCategories.value
    }
})
</script>

<style scoped>

</style>