<script setup lang="ts">

type PAYLOAD = {
    name: string
    email: string
    password: string
}

const form = ref<PAYLOAD>({
    name: '',
    email: '',
    password: ''
})

const onSubmit = async () => {
  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: form.value
    })
    
    navigateTo('/')
  } catch (error) {
    console.error(error)
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
                        Register
                      </CardTitle>
                      <CardDescription>
                        Enter your information below to create to your account.
                      </CardDescription>
                    </CardHeader>
                    <CardContent class="grid gap-4">
                      <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input id="name" placeholder="Name" v-model="form.name" />
                      </div>
                      <div class="grid gap-2">
                        <Label for="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" v-model="form.email" required />
                      </div>
                      <div class="grid gap-2">
                        <Label for="password">Password</Label>
                        <Input id="password" type="password" v-model="form.password" required />
                      </div>
                      <div class="grid grid-cols-1">
                        <!-- <Button type="button" variant="outline">
                            <div class="flex items-center">
                                <Icon name="radix-icons:github-logo" class="mr-2 h-4 w-4"></Icon>
                                Github
                            </div>
                        </Button> -->
                        <AuthSocialButton icon="radix-icons:github-logo" label="Github" />
                      </div>
                    </CardContent>
                    <CardFooter class="flex-col space-y-2">
                      <Button class="w-full" type="submit">
                        Register
                      </Button>
                      <p>
                        Already have an account?

                        <NuxtLink to="/auth/login" 
                                  class="border-b border-gray-500 text-muted-foreground hover:text-primary">
                            Login
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