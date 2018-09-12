<template>
    <v-stepper v-model="e6"
               vertical>

        <v-stepper-step :complete="$store.state.currStep > 1"
                        step="1">
            Enter User ID
        </v-stepper-step>

        <v-stepper-content step="1">
            <StepOne v-on:validate-user="fetchFirstSentence()" />
        </v-stepper-content>

        <v-stepper-step :complete="$store.state.currStep > 2"
                        step="2">
            Record a Sentence
            <small>Press "Start" button and wait for a readout sentence to appear.</small>
        </v-stepper-step>

        <v-stepper-content step="2">
            <StepTwo v-on:start="startRecording()"
                     v-on:skip="skipSentence()"
                     v-on:upload="uploadRecording()"
                     v-on:stop="stopRecording()"
                     v-on:retry="retryRecording()" />
        </v-stepper-content>

    </v-stepper>
</template>

<script>
import StepOne from "~/components/StepOne";
import StepTwo from "~/components/StepTwo";
import axios from "~/plugins/axios";
import AWS from "aws-sdk";

export default {
  data: function() {
    return {
      recorder: null
    };
  },
  created: function() {
    this.$store.watch(
      state => state.isRecording,
      () => {
        if (this.$store.state.isRecording) {
          // TODO: Start recording here
        } else {
          // TODO: Stop recording here
        }
      }
    );

    if (process.browser) {
      // Init recorder instance
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(stream => {
          // create media recorder instance to initialize recording
          this.recorder = new MediaRecorder(stream);

          // function to be called when data is received
          this.recorder.ondataavailable = e => {
            this.$store.commit("setCurrFile", {
              data: new Blob([e.data], { type: "audio/wav" }),
              name: `${this.$store.state.userId}-${
                this.$store.state.currSentenceData.sentence_id
              }-${new Date().getTime()}.wav`,
              lastModifiedData: new Date()
            });

            // create audio element to show to the user what he recorded
            const blobUrl = URL.createObjectURL(
              this.$store.state.currFile.data
            );

            this.$store.state.audioSrc = blobUrl;
            this.$store.commit("setRecordingState", false);
          };

          // function to be called when recording started
          this.recorder.onstart = () => {
            this.$store.state.audioSrc = null;
            this.$store.state.currFile = null;
            this.$store.commit("setRecordingState", true);
          };
        })
        .catch(err => {
          console.error(err);
          this.$store.commit("setAudioAvail", false);
        });
    }
  },
  components: {
    StepOne,
    StepTwo
  },
  computed: {
    e6: {
      get() {
        return this.$store.state.currStep;
      },
      set(value) {
        this.$store.commit("setStep", value);
      }
    }
  },
  methods: {
    fetchSentence: async function(assignToView) {
      let { data } = await axios.get(
        `/api/sentences/${this.$store.state.userId}`
      );

      if (data) {
        assignToView ? this.$store.commit("setSentenceData", data) : null;
        this.$store.commit("setStep", 2);
      } else {
        this.$store.commit("setSnack", "Wrong user ID, no sentences found!");
        this.$store.commit("setStep", 1);
      }
    },

    startRecording: function() {
      this.recorder.start();
      setTimeout(() => {
        this.fetchSentence(true);
      }, 1000);
    },

    stopRecording: function() {
      setTimeout(() => {
        this.recorder.stop();
      }, 1000);
    },

    retryRecording: function() {
      const currSentenceData = this.$store.state.currSentenceData;
      this.$store.commit("setSentenceData", null);
      this.recorder.start();
      setTimeout(() => {
        this.$store.commit("setSentenceData", currSentenceData);
      }, 1000);
    },

    fetchFirstSentence: async function() {
      this.fetchSentence(false);
    },

    skipSentence: async function() {
      await axios.post(`/api/sentences`, {
        state: "Skip",
        sentenceId: this.$store.state.currSentenceData.sentence_id,
        userId: this.$store.state.userId
      });

      this.$store.commit("setSentenceData", null);
      this.recorder.stop();

      this.startRecording();
    },

    uploadRecording() {
      const AWSService = AWS;
      const bucketName = "asr-heb-train-data";
      const bucketRegion = "us-east-1";
      const IdentityPoolId = "us-east-1:117fa1ae-e930-4421-9cdf-3ea355d02a01";

      //Configures the AWS service and initial authorization
      AWSService.config.update({
        region: bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: IdentityPoolId
        })
      });

      //adds the S3 service, make sure the api version and bucket are correct
      const s3 = new AWSService.S3({
        apiVersion: "2006-03-01",
        params: { Bucket: bucketName }
      });

      s3.upload(
        {
          Key: this.$store.state.currFile.name,
          Bucket: bucketName,
          Body: this.$store.state.currFile.data,
          ACL: "public-read"
        },
        (err, data) => {
          if (err) {
            this.showToast(`Error occoured, please contact admin`);
            console.error(err, "there was an error uploading your file");
          } else {
            axios
              .post(`/api/sentences`, {
                state: "Done",
                sentenceId: this.$store.state.currSentenceData.sentence_id,
                userId: this.$store.state.userId,
                url: data.Location
              })
              .then(() => {
                // TODO: Reset sentence and show start button again
                this.$store.commit("reset");
              })
              .catch(error => {
                console.error(error);
                this.showToast(`Error occoured, please contact admin`);
              });
          }
        }
      );
    },

    showToast(msg) {
      this.$store.commit("setSnack", msg);
    }
  }
};
</script>