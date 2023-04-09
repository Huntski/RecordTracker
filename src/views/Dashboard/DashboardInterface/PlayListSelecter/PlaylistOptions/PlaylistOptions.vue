<template>
    <TransitionGroup tag="ul" name="list" class="base-scrollbar flex flex-col text-left py-2 text-gray-400 h-96 overflow-y-scroll overflow-x-hidden">
        <li key="createInput" class="flex flex-col" v-show="showCreatePlaylistInput">
            <input
                class="py-1.5 px-4 cursor-pointer bg-transparent w-full outline-none text-white"
                ref="createInput"
                @focusout="closeInput"
                placeholder="Playlist"
                @keydown.enter="createPlaylist"
                @keydown.esc="closeInput"
                v-model="playlistName"
                @input="resetErrors"
                :class="{'error' : errorMessage}"
                maxlength="30"
            >
            <span class="text-xs pl-4 text-orange-400" v-show="errorMessage">{{errorMessage[0]}}</span>
        </li>

        <li
            v-for="playlist in playlists"
            :key="playlist.id"
            class="hover:text-white py-1.5 px-4 cursor-pointer "
            @click="handleChangeEvent(playlist)"
            :class="{'text-dominant hover:text-dominant' : playlist === selectedPlaylist}"
        >{{ playlist.name }}</li>
    </TransitionGroup>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {Playlist} from "@/store/modules/playlist.types"
import {
    ApiCreatePlaylistError,
    createPlaylist,
    getAlbumsFromPlaylist,
    getPlaylists,
    selectPlaylist
} from "@/services/playlistService"
import store from "@/store"
import {AxiosResponse} from "axios"

export default defineComponent({
    data() {
        return {
            showCreatePlaylistInput: false,
            playlistName: '',
            errorMessage: ''
        }
    },

    computed: {
        playlists(): Playlist[] {
            return store.getters['playlist/getPlaylists']
        },

        selectedPlaylist(): Playlist {
            return store.getters['playlist/getSelectedPlaylist']
        },
    },

    methods: {
        showInput() {
            this.showCreatePlaylistInput = true

            const createInput = this.$refs.createInput as Record<any, any>

            this.$nextTick(() => createInput.focus())
        },

        closeInput() {
            this.showCreatePlaylistInput = false
            this.resetErrors()
        },

        resetErrors() {
            this.errorMessage = ''
        },

        createPlaylist(e: { target: { value: string } }) {
            if (e.target.value === '') {
                return this.resetErrors()
            }

            createPlaylist(this.playlistName).then((response: AxiosResponse|ApiCreatePlaylistError) => {
                if (response.status === 201) {
                    this.playlistName = ''
                    this.closeInput()
                }

                if (response.status === 422) {
                    this.errorMessage = response.data.name
                }

                getPlaylists()
            })
        },

        handleChangeEvent(playlist: Playlist) {
            selectPlaylist(playlist)
            getAlbumsFromPlaylist(playlist)
        },
    }
})
</script>

<style scoped>
input::placeholder {
    font-style: italic;
}

input.error {
    animation: wiggle 300ms
}

@keyframes wiggle {
    20% {
        transform: translateX(5px);
    }

    60% {
        transform: translateX(-5px);
    }

    80% {
        transform: translateX(5px);
    }
}

</style>
