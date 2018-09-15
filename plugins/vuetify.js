import Vue from 'vue';

import {
    Vuetify,
    VApp,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VSnackbar,
    VBadge,
    VImg,
    VStepper,
    VCard,
    VSubheader,
    VTextField,
    VDivider,
    transitions
} from 'vuetify';
import LRU from 'lru-cache';

const themeCache = LRU({
    max: 10,
    maxAge: 1000 * 60 * 60 // 1 hour
})

Vue.use(Vuetify, {
    components: {
        VApp,
        VBtn,
        VIcon,
        VGrid,
        VToolbar,
        VSnackbar,
        VBadge,
        VImg,
        VStepper,
        VCard,
        VSubheader,
        VTextField,
        VDivider,
        transitions
    },
    options: {
        minifyTheme: function (css) {
            return process.env.NODE_ENV === 'production'
                ? css.replace(/[\s|\r\n|\r|\n]/g, '')
                : css
        },
        themeCache
    }
});