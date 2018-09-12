<template>
    <v-layout align-center
              justify-center
              column
              fill-height>
        <h1 dir="rtl"
            class="mt-3 mb-3"
            v-if="$store.state.currSentenceData && $store.state.currSentenceData.sentence">{{ $store.state.currSentenceData.sentence }}</h1>
        <!-- no currFile and not recording -->
        <v-flex align-center
                v-if="!$store.state.isRecording && !$store.state.currFile.data">
            <v-btn color="primary"
                   @click="$emit('start')">Start</v-btn>
        </v-flex>
        <!-- currFile and not recording -->
        <v-flex v-if="!$store.state.isRecording && $store.state.currFile.data">
            <div v-if="$store.state.audioSrc">
                <audio :src="$store.state.audioSrc"
                       controls>Your browser does not support the
                    <code>audio</code> element.</audio>
            </div>
            <div class="d-flex">
                <v-btn color="primary"
                       @click="$emit('upload')">Upload</v-btn>
                <v-btn flat
                       @click="$emit('retry')">Retry</v-btn>
            </div>
        </v-flex>
        <!-- recording -->
        <v-flex justify-center
                v-if="$store.state.isRecording">
            <v-btn color="primary"
                   @click="$emit('stop')">Stop</v-btn>
            <v-btn flat
                   @click="$emit('skip')">Skip Sentence</v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
export default {};
</script>
