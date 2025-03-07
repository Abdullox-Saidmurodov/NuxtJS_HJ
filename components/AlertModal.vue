<template>
    <Modal :is-modal-visible="isModalVisible" title="Are you sure?" 
           description="This action cannot be undone" @on-close="toggleAlertModal(false)">
        <div class="pt-6 space-x-2 items-center justify-end w-full">
            <Button :disabled="isLoading" variant="outline" @click="toggleAlertModal(false)">Cancel</Button>
            <Button :disabled="isLoading" variant="destructive" @click="emit('onConfirm')">Continue</Button>
        </div>
    </Modal>
</template>

<script setup lang="ts">
const { isLoading, isAlertModalVisible, toggleAlertModal } = useStore()
const isModalVisible = computed(() => isAlertModalVisible.value)
const emit = defineEmits(['onConfirm'])
</script>

<style scoped>

</style>