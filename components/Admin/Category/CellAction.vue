<script setup lang="ts">
const props = defineProps<{
  category: {
    id: string
  }
}>()
function copy(id: string) {
  navigator.clipboard.writeText(id)
  showMessage({
    title: 'Category Id'
  })
}
const { showMessage, showError, isLoading, isAlertModalVisible, toggleAlertModal, toggleLoading } = useStore()
const deleteCategory = async () => {
    try {
        toggleLoading(true)
        const data = await $fetch(`/api/admin/categories/${props.category.id}`, {
            method: 'DELETE',
        })
        showMessage({
            title: 'Delete Category'
        })
        // TODO refresh data
        refreshNuxtData('categories')
    } catch (error) {
        const err = handlerError(error)
        showError(err)
    } finally {
        toggleLoading(false)
    }
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <Icon name="lucide:more-horizontal" class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
          <DropdownMenuItem @click="copy(category.id)">
            <Icon name="lucide:copy" class="w-4 h-4" />
            <span>Copy ID</span>
          </DropdownMenuItem>
          <DropdownMenuItem @click="navigateTo(`/admin/categories/${category.id}`)">
            <Icon name="lucide:edit" class="w-4 h-4" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem @click="toggleAlertModal(true)">
            <Icon name="lucide:trash" class="w-4 h-4" />
            <span>Delete</span>
          </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <AlertModal v-if="isAlertModalVisible" @on-confirm="deleteCategory"></AlertModal>
</template>