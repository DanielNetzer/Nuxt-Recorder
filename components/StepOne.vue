<template>
  <div>
    <v-text-field v-model="userId"
                  label="User ID"
                  required></v-text-field>
    <v-btn color="primary"
           @click="$emit('validate-user')"
           :disabled="!$store.state.userId">Submit</v-btn>
  </div>
</template>

<script>
export default {
  computed: {
    userId: {
      get() {
        return this.$store.state.userId;
      },
      set(value) {
        this.$store.commit("setUserId", value);
      }
    }
  }
};
</script>

