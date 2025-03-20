<template>
    <Modal :is-modal-visible="isOpen" @on-close="onClose">
        <div class="grid w-full grid-cols-1 items-start gap-y-8 sm:grid-cols-12 lg:gap-x-8" 
             v-if="selectedProduct">
            <div class="sm:col-span-4 lg:col-span-5">
                <Carousel class="relative w-full">
                    <CarouselContent>
                        <CarouselItem v-for="(image, i) in selectedProduct.images" :key="i">
                            <img :src="image.url" alt="" class="size-[150px] object-cover object-center" />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious class="previous-btn" />
                    <CarouselNext class="next-btn" />
                </Carousel>
            </div>
            <div class="sm:col-span-8 lg:col-span-7">
                <ProductInfo :data="selectedProduct"></ProductInfo>
            </div>
        </div>
    </Modal>
</template>

<script setup lang="ts">
const { isOpen, onClose, selectedProduct } = usePreviewModal()
</script>

<style scoped>
.previous-btn {
    left: calc(50% - 40px);
    top: calc(100% + 30px);
}
.next-btn {
    left: 50%;
    top: calc(100% + 30px);
}
</style>