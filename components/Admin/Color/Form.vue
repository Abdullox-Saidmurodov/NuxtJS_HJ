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
                        <Input placeholder="Color Name" v-bind="componentField" :disabled="isLoading" />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="value">
                    <FormItem>
                      <FormLabel>Color Code</FormLabel>
                      <FormControl>
                        <Input type="color" placeholder="#000000" v-bind="componentField" :disabled="isLoading" />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                </FormField>
            </div>
            <Button :disabled="isLoading" type="submit" class="ml-auto">{{ action }}</Button>
        </form>
    </div>
    <AlertModal v-if="isAlertModalVisible" @on-confirm="deleteColor" 
                :is-open="isAlertModalVisible" @on-close="isAlertModalVisible = false"></AlertModal>
</template>

<script setup lang="ts">
import type { RouteParams } from '~/types'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

const { isLoading, showMessage, showError, toggleLoading, toggleError } = useStore()

const title = ref('Add Color')
const description = ref('Edit Color')
const toastMessage = ref('Color Updated')
const action = ref('Save Changes')
const isEditing = ref(true)
const isAlertModalVisible = ref(false)

const route = useRoute()
const { data: currentColor } = await useFetch(`/api/admin/colors/${(route.params as RouteParams).colorId}`)

watchEffect(() => {
    if(!currentColor.value) {
        title.value = 'Create Color'
        description.value = 'Add a new Color'
        action.value = 'Create Color'
        isEditing.value = false
        toastMessage.value = 'Color Added'
    }
})

const formSchema = toTypedSchema(colorSchema)
const form = useForm({
    validationSchema: formSchema,
    initialValues: currentColor.value || {
        name: '',
        value: '#000000'
    }
})

const onSubmit = form.handleSubmit(async (values) => {
    try {
        toggleLoading(true)

        if(isEditing.value) {
            const data = await $fetch(`/api/admin/colors/${(route.params as RouteParams).colorId}`, {
                method: 'PATCH',
                body: values
            })
        } else {
            const data = await $fetch('/api/admin/colors/', {
                method: 'POST',
                body: values
            })
        }
        showMessage({
            title: toastMessage.value
        })
        await navigateTo('/admin/colors')
    } catch (error) {
        const err = handlerError(error)
        showError(err)
    } finally {
        toggleLoading(false)
    }
})

const deleteColor = async () => {
    try {
        toggleLoading(true)
        const data = await $fetch(`/api/admin/colors/${(route.params as RouteParams).colorId}`, {
            method: 'DELETE',
        })
        showMessage({
            title: title.value
        })
        await navigateTo('/admin/colors')
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