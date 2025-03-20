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
// import type { Product } from '@prisma/client';

// const { data: products, status } = await useFetch<Product>('/api/admin/products', {
//     key: 'products',
//     transform: (products) => {
//         // @ts-ignore
//         return products.map(item => {
//             return {
//                 id: item.id,
//                 name: item.name,
//                 price: formatter.format(+item.price),
//                 isFeatured: item.isFeatured,
//                 isArchived: item.isArchived,
//                 category: item.category.name,
//                 size: item.size.value,
//                 color: item.color.value,
//                 createdAt: useDateFormat(new Date(item.createdAt), 'MMMM D, YYYY').value,
//             }
//         })
//     }
// })
import type { SafeProduct } from '~/types'

const { data: product, status, } = await useFetch<SafeProduct[]>('/api/admin/products', {
    lazy: true
})
</script>

<style scoped>

</style>