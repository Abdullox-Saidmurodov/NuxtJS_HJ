<template>
    <!-- <div>
        Category Form
    </div> -->
    <div>
        <div class="flex items-center justify-between">
            <Heading :title="title" :description="description">
                
            </Heading>
            <Button @click="toggleAlertModal(true)" v-if="isEditing" variant="destructive" size="sm">
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
                        <Input placeholder="Category Name" v-bind="componentField" :disabled="isLoading" />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  </FormField>
            </div>
            <Button :disabled="isLoading" type="submit" class="ml-auto">{{ action }}</Button>
        </form>
    </div>
    <AlertModal v-if="isAlertModalVisible" @on-confirm="deleteCategory"></AlertModal>
</template>

<script setup lang="ts">
import type { RouteParams } from '~/types'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

const { isLoading, showMessage, showError, toggleLoading, toggleError, toggleAlertModal, isAlertModalVisible } = useStore()

const title = ref('Add Category')
const description = ref('Edit Category')
const toastMessage = ref('Category Updated')
const action = ref('Save Changes')
const isEditing = ref(false)
const route = useRoute()
const { data: currentCategory } = await useFetch(`/api/admin/categories/${(route.params as RouteParams).categoryId}`)
const formSchema = toTypedSchema(categorySchema)
const form = useForm({
    validationSchema: formSchema,
    initialValues: currentCategory.value || {
        name: ''
    }
})

const onSubmit = form.handleSubmit(async (values) => {
    try {
        toggleLoading(true)

        if(isEditing.value) {
            console.log('Edit Category ', values)
        } else {
            // console.log('Add Category ', values)
            const data = await $fetch('api/admin/categories', {
                method: 'POST',
                body: values
            })
            console.log(data)
        }
        showMessage({
            title: title.value
        })
        // TODO refresh data
        navigateTo('/admin/categories')
    } catch (error) {
        const err = handlerError(error)
        showError(err)
    } finally {
        toggleLoading(false)
    }
})

const deleteCategory = async () => {
    try {
        toggleLoading(true)
        console.log('Delete Category')
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