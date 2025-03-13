<template>
  <NuxtLoadingIndicator></NuxtLoadingIndicator>
  <NuxtLayout>
    <Toaster />
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>