<template>
  <div class="MainWrapper"><hello-world></hello-world></div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";
export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
<style lang="scss" scoped>
.MainWrapper {
}
</style>
