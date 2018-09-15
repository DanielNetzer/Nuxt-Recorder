<style>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>

<template>
  <v-layout align-center
            justify-center>
    <v-flex xs12
            sm8
            md6
            lg6>
      <v-subheader>Welcome to Over.AI Recorder</v-subheader>

      <transition name="fade">
        <Stepper v-if="$store.state.isAudioAvail" />
      </transition>

      <transition name="fade">
        <v-card v-if="!$store.state.isAudioAvail">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Recording Unavailable</h3>
              <p>If you declined to give permissions to the application for using your microphone you can change that in the following way:
                <ol>
                  <li>Click on the
                    <a href="https://support.mozilla.org/en-US/kb/how-do-i-tell-if-my-connection-is-secure">site identity icon</a> (the lock symbol) in the address bar.</li>
                  <li>Choose Allow on each menu next to Use the Camera and Use the Microphone:</li>
                  <li>Click anywhere on the web page to close the menu, then click the Retry button.</li>
                </ol>
              </p>
            </div>
          </v-card-title>
        </v-card>
      </transition>

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