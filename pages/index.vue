<template>
  <v-layout align-center
            justify-center>
    <v-flex xs12
            sm8
            md6
            lg6>
      <v-subheader>Welcome to Over.AI Recorder</v-subheader>
      <Stepper />
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "~/plugins/axios";
import Stepper from "~/components/Stepper";

export default {
  components: {
    Stepper
  }
};
</script>