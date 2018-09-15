import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: {
            snack: '',
            isRecording: false,
            currSentenceData: null,
            userId: null,
            currStep: 1,
            isAudioAvail: true,
            audioSrc: null,
            currFile: {
                name: null,
                data: null,
                lastModifiedData: null
            }
        },
        mutations: {
            setSnack(state, snack) {
                state.snack = snack
            },
            setRecordingState(state, bool) {
                state.isRecording = bool;
            },
            setSentenceData(state, sentenceData) {
                state.currSentenceData = Object.assign({}, sentenceData);
            },
            setUserId(state, userId) {
                state.userId = userId;
            },
            setStep(state, stepNumber) {
                state.currStep = stepNumber;
            },
            setCurrFile(state, fileProps) {
                state.currFile = Object.assign({}, state.currFile, { ...fileProps });
            },
            setAudioAvail(state, bool) {
                state.isAudioAvail = bool;
            },
            setAudioSrc(state, src) {
                state.audioSrc = src;
            },
            reset(state) {
                // !$store.state.isRecording && !$store.state.currFile.data
                state.isRecording = false;
                state.currFile = Object.assign({}, {
                    name: null,
                    data: null,
                    lastModifiedData: null
                });
                state.currSentenceData = null;
                state.audioSrc = null;
            }
        }
    })
}

export default createStore