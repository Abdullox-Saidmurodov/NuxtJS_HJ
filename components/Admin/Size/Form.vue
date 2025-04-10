<template>
    <div>
        <div class="flex items-center justify-between">
            <Heading :title="title" :description="description">
                
            </Heading>
            <Button @click="isAlertModalVisible = !isAlertModalVisible" v-if="isEditing" variant="destructive" size="sm">
                <Icon name="lucide:trash" class="h-4 w-4"></Icon>
            </Button>
        </div>
        <Separator class="my-4"></Separator>
        <form @submit.prevent="onSubmit" class="space-y-8 w-full">
            <div class="md:grid md:grid-cols-3 gap-8">
                <FormField v-slot="{ componentField }" name="name">
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Size Name" v-bind="componentField" :disabled="isLoading" />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="value">
                    <FormItem>
                      <FormLabel>Size Code</FormLabel>
                      <FormControl>
                        <Input placeholder="xl" v-bind="componentField" :disabled="isLoading" />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                </FormField>
            </div>
            <Button :disabled="isLoading" type="submit" class="ml-auto">{{ action }}</Button>
        </form>
    </div>
    <AlertModal v-if="isAlertModalVisible" @on-confirm="deleteSize" 
                :is-open="isAlertModalVisible" @on-close="isAlertModalVisible = false"></AlertModal>
</template>

<script setup lang="ts">
import type { RouteParams } from '~/types'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

const { isLoading, showMessage, showError, toggleLoading, toggleError } = useStore()

const title = ref('Add Size')
const description = ref('Edit Size')
const toastMessage = ref('Size Updated')
const action = ref('Save Changes')
const isEditing = ref(true)
const isAlertModalVisible = ref(false)

const route = useRoute()
const { data: currentSize } = await useFetch(`/api/admin/sizes/${(route.params as RouteParams).sizeId}`)

watchEffect(() => {
    if(!currentSize.value) {
        title.value = 'Create Size'
        description.value = 'Add a new Size'
        action.value = 'Create Size'
        isEditing.value = false
        toastMessage.value = 'Size Added'
    }
})

const formSchema = toTypedSchema(sizeSchema)
const form = useForm({
    validationSchema: formSchema,
    initialValues: currentSize.value || {
        name: '',
        value: ''
    }
})

const onSubmit = form.handleSubmit(async (values) => {
    try {
        toggleLoading(true)

        if(isEditing.value) {
            const data = await $fetch(`/api/admin/sizes/${(route.params as RouteParams).sizeId}`, {
                method: 'PATCH',
                body: values
            })
        } else {
            const data = await $fetch('/api/admin/sizes/', {
                method: 'POST',
                body: values
            })
        }
        showMessage({
            title: toastMessage.value
        })
        await navigateTo('/admin/sizes')
    } catch (error) {
        const err = handlerError(error)
        showError(err)
    } finally {
        toggleLoading(false)
    }
})

const deleteSize = async () => {
    try {
        toggleLoading(true)
        const data = await $fetch(`/api/admin/sizes/${(route.params as RouteParams).sizeId}`, {
            method: 'DELETE',
        })
        showMessage({
            title: title.value
        })
        await navigateTo('/admin/sizes')
    } catch (error) {
        const err = handlerError(error)
        showError(err)
    } finally {
        toggleLoading(false)
    }
}
</script>

<style scoped>

</style>