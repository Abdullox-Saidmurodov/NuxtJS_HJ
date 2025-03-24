<template>
    <Sheet>
        <SheetTrigger as-child>
            <Button class="rounded-full lg:hidden">
                <Icon class="size-4 mr-2" name="" />
                FIlters
            </Button>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader class="mb-6">
                <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <Filter valueKey="sizeId" name="Size" :data="sizes" />
            <Filter valueKey="colorId" name="Colors" :data="colors" />
            <Filter valueKey="categoryId" name="Categories" :data="categories" />
        </SheetContent>
    </Sheet>
</template>

<script setup lang="ts">
import type { Category, Color, Size } from '@prisma/client';

interface FilterProps {
    data: Size[]
    colors: Color[]
    categories: Category[]
}
const props = defineProps<FilterProps>()
</script>

<style scoped>

</style>