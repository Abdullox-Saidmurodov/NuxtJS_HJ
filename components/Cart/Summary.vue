<template>
  <div
    class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
  >
    <h2 class="text-lg font-medium text-gray-900">Order summary for this</h2>
    <div class="mt-6 space-y-4">
      <div class="flex items-center justify-between border-t border-gray-200 pt-4">
        <div class="text base font-medium text-gray-900">Order total</div>
        <div class="font-semibold">
          {{ formatter.format(Number(totalPrice)) }}
        </div>
      </div>
    </div>
    <Button
      @click="onCheckout"
      type="button"
      :disabled="!cartItem.length"
      class="w-full mt-6"
      >Checkout</Button
    >
  </div>
</template>

<script setup lang="ts">
const { cartItem, removeAll } = useCart();

const totalPrice = computed(() => {
  return cartItem.value.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);
});
const route = useRoute();
const { showMessage } = useStore();
const onCheckout = async () => {
  // API Call
  const cartItems = cartItem.value.map((item) => item.id);
  console.log(cartItems);
  const data = await $fetch("/api/checkout", {
    method: "POST",
    body: cartItems,
  });
  console.log(data);
  if (data) {
    // @ts-ignore
    window.location.href = data;
  }
  removeAll();
  return;
};
onMounted(() => {
  if (route.query.success) {
    showMessage({
      title: "Payment Completed",
    });
  }
  if (route.query.canceled) {
    showMessage({
      title: "Something went wrong",
      variant: "destructive",
    });
  }
});
</script>

<style scoped></style>
