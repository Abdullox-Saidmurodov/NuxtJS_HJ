<script setup lang="ts">

type PAYLOAD = {
    email: string
    password: string
}

const form = ref<PAYLOAD>({
    email: '',
    password: ''
})

const { toggleLoading, showMessage, showError, isLoading } = useStore()
const onSubmit = async () => {
  try {
    toggleLoading(true)
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: form.value
    })
    showMessage({
      title: 'Welcome Back'
    })
    await navigateTo('/')
  } catch (error) {
    // console.error(error)
    // console.log(error.response)
    // console.log(error.response._data)
    const err = handlerError(error)
    showError(err)    
  } finally {
    toggleLoading(false)
  }
}

</script>

<template>
    <div class="flex flex-col justify-center items-center min-h-screen">
        <div class="w-full max-w-md">
            <form @submit.prevent="onSubmit" action="">
                <Card>
                    <CardHeader>
                      <CardTitle class="text-2xl">
                        Login {{ isLoading }}
                      </CardTitle>
                      <CardDescription>
                        Enter your information below to login to your account.
                      </CardDescription>
                    </CardHeader>
                    <CardContent class="grid gap-4">
                      <div class="grid gap-2">
                        <Label for="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" v-model="form.email" required />
                      </div>
                      <div class="grid gap-2">
                        <Label for="password">Password</Label>
                        <Input id="password" type="password" v-model="form.password" required />
                      </div>
                      <div class="grid grid-cols-1">
                        <AuthSocialButton icon="radix-icons:github-logo" label="Github" />
                      </div>
                    </CardContent>
                    <CardFooter class="flex-col space-y-2">
                      <Button :disabled="isLoading" class="w-full" type="submit">
                        Login
                      </Button>
                      <p>
                        Don't have an account?

                        <NuxtLink to="/auth/register" 
                                  class="border-b border-gray-500 text-muted-foreground hover:text-primary">
                            Register
                        </NuxtLink>
                      </p>
                    </CardFooter>
                </Card>
            </form>
        </div>
    </div>
</template>

<style scoped>

</style>