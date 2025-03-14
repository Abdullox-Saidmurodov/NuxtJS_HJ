<script setup lang="ts">
const props = defineProps<{
  size: {
    id: string
  }
}>()
function copy(id: string) {
  navigator.clipboard.writeText(id)
  showMessage({
    title: 'Size Id copied'
  })
}
const { showMessage, showError, toggleLoading } = useStore()
const isAlertModalVisible = ref(false)
const deleteSize = async () => {
    try {
        toggleLoading(true)
        const data = await $fetch(`/api/admin/sizes/${props.size.id}`, {
            method: 'DELETE',
        })
        showMessage({
            title: 'Delete Size'
        })
        refreshNuxtData('sizes')
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
          <DropdownMenuItem @click="copy(size.id)">
            <Icon name="lucide:copy" class="w-4 h-4" />
            <span>Copy ID</span>
          </DropdownMenuItem>
          <DropdownMenuItem @click="navigateTo(`/admin/sizes/${size.id}`)">
            <Icon name="lucide:edit" class="w-4 h-4" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem @click="isAlertModalVisible = !isAlertModalVisible">
            <Icon name="lucide:trash" class="w-4 h-4" />
            <span>Delete</span>
          </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <AlertModal v-if="isAlertModalVisible" @on-confirm="deleteSize" 
              :is-open="isAlertModalVisible" @on-close="isAlertModalVisible = false"></AlertModal>
</template>