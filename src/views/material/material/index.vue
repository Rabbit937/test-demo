<template>
  <Tabs>
    <template #album>
      <AlbumManagement />
    </template>
    <template #material>
      <MaterialManagement />
    </template>
  </Tabs>
</template>

<script setup lang="ts">
import Tabs from "./components/Tabs.vue";
import AlbumManagement from "./components/AlbumManagement.vue";
import MaterialManagement from "./components/MaterialManagement.vue";
</script>