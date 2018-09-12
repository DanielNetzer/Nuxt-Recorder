<template>
  <v-app>
    <Snackbar />
    <v-toolbar fixed
               app>
      <v-spacer></v-spacer>
      <v-img :src="require(`~/assets/imgs/logo.png`)"
             height="80%"
             :contain="true">
      </v-img>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid
                   fill-height>

        <nuxt />

      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Snackbar from "~/components/Snackbar";

export default {
  components: {
    Snackbar
  },
  data() {
    return {
      title: "Over.AI TTS Recorder"
    };
  }
};
</script>
