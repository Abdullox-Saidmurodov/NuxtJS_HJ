<template>
    <header class="border-b z-10">
        <div class="flex h-16 items-center px-4 justify-between">
            <NuxtLink to="/">
                <img src="/logo.svg" class="cursor-pionter h-[30px]" alt="">
            </NuxtLink>
            <nav class="flex items-center space-x-4 lg:space-x-6">
                <template v-if="user">
                    <DropdownMenu v-if="user.role === 'ADMIN'">
                        <DropdownMenuTrigger as-child>
                          <Button variant="secondary" class="relative">
                            Admin <Icon name="lucide:chevron-down" class="h-4 w-4 ml-2"></Icon>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="w-56" align="end">
                            <NuxtLink to="/admin" >
                                <DropdownMenuItem>
                                    Analitics
                                </DropdownMenuItem>
                            </NuxtLink>
                            <NuxtLink to="/admin/sizes" >
                                <DropdownMenuItem>
                                    Sizes
                                </DropdownMenuItem>
                            </NuxtLink>
                            <NuxtLink to="/admin/categories" >
                                <DropdownMenuItem>
                                    Categories
                                </DropdownMenuItem>
                            </NuxtLink>
                            <NuxtLink to="/admin/colors" >
                                <DropdownMenuItem>
                                    Colors
                                </DropdownMenuItem>
                            </NuxtLink>
                            <NuxtLink to="/admin/products" >
                                <DropdownMenuItem>
                                    Products
                                </DropdownMenuItem>
                            </NuxtLink>
                            <!-- <NuxtLink to="/auth/login" >
                                <DropdownMenuItem>
                                    Login
                                </DropdownMenuItem>
                            </NuxtLink>
                            <NuxtLink to="/auth/register" >
                                <DropdownMenuItem>
                                    Register
                                </DropdownMenuItem>
                            </NuxtLink> -->
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button variant="ghost" size="icon" class="relative w-8 h-8 rounded-full">
                                <Avatar>
                                    <Icon name="radix-icons:avatar" class="h-4 w-4"></Icon>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="w-56" align="end">
                            <DropdownMenuLabel class="font-normal flex">
                                <div class="flex flex-col space-y-1">
                                    <p class="text-sm font-medium leadin-none">
                                        {{ user.name }}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem @click="logout">
                                <Icon name="solar:logout-2-broken" class="h-4 w-4 mr-2"></Icon>
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </template>
                <NuxtLink to="/cart">
                    <Button class="relative rounded-full px-5 py-1 h-8">
                        <Icon name="lucide:shopping-bag" class="h-4 w-4 mr-2"></Icon>
                        {{ cartItem ? cartItem.length : 0 }}
                    </Button>
                </NuxtLink>
            </nav>
        </div>
    </header>
</template>

<script setup lang="ts">
const { user, clear } = useUserSession()
const logout = async () => {
    await clear()
    navigateTo('/auth/login')
}
const { cartItem } = useCart()
</script>

<style scoped>

</style>