<template>
    <section class="bg-rose-100">
        <div class="relative isolate px-6 pt-14 lg:px-8">
            <div class="mx-auto max-w-5xl py-16 sm:py-32">
                <div class="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div class="relative rounded-full px-3 py-1 text-sm 
                                leading-6 text-foreground ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                        Annoucing our next summer Products
                        <NuxtLink to="/products" class="font-semibold text-primary">
                            <span class="absolute inset-0" aria-hidden="true" />
                            Explore Products
                            <span aria-hidden="true">&rarr;</span>
                        </NuxtLink>
                    </div>
                </div>
                <div class="text-center">
                    <h1 class="text-3xl font-bold tracking-tight text-foreground sm:text-6xl">
                        Summer styles are finally here
                    </h1>
                    <p class="mt-6 text-lg leading-8 text-foreground">
                        Anim aute id magna aliqua ad ad non deserunt sunt, Qui irure qui loram
                        cupidatat commodo. Elite sunt amet fugiat veniam occaecatfugiat aliqua.
                    </p>
                    <div class="mt-10 flex items-center justify-center gap-x-6">
                        <NuxtLink to="/products"><Button>Shop Collection</Button></NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>