<template>
    <BaseField @focusout="handleFocusOut" tabindex="0" ref="playListSelector">
        <div class="playlist-actions flex flex-col overflow-hidden transition" :class="{'active': open}">
            <button class="flex items-center gap-5 px-5 text-sm py-3 rounded-t" :class="{'text-dominant': !selectedPlaylist}" @click="selectFullCollection">
                <CollectionIcon class="w-4" />

                <span>Your Collection</span>

                <div class="w-4" />
            </button>

            <button class="flex items-center gap-5 px-5 text-sm text-gray-200 hover:text-white py-3 rounded-t" @click="selectFullCollection">
                <FireIcon class="w-4" />

                <span>Recently added</span>

                <div class="w-4" />
            </button>

            <CreatePlaylistButton @click="showCreatePlaylistInput" />

            <PlaylistOptions ref="playlistOptions" />
        </div>

        <button class="flex outline-none justify-between items-center p-4 font-major font-bold w-60" @click="open = !open">
            <span>Playlists</span>

            <SmallArrowIcon class="w-3 transform" :class="{'rotate-180' : !open}" />
        </button>
    </BaseField>
</template>

<script lang="ts">
import {CollectionIcon, SmallArrowIcon, FireIcon} from "@/components/@icons"
import {BaseField} from "@/components/@fields"
import PlaylistOptions from "@/views/Dashboard/DashboardInterface/PlayListSelecter/PlaylistOptions"
import CreatePlaylistButton from "@/views/Dashboard/DashboardInterface/PlayListSelecter/CreatePlaylistButton.vue"
import {defineComponent} from "vue"
import {Playlist} from "@/store/modules/playlist.types"
import {getPlaylists} from "@/services/playlistService"
import store from "@/store"
import {getAlbumCollection} from "@/services/albumService"

export default defineComponent({
    data() {
        return {
            open: false,
        }
    },

    computed: {
        selectedPlaylist(): Playlist {
            return store.getters['playlist/getSelectedPlaylist']
        },
    },

    methods: {
        selectFullCollection() {
            if (this.selectedPlaylist) {
                store.commit('playlist/SET_SELECTED_PLAYLIST', null)

                getAlbumCollection()
            }
        },

        showCreatePlaylistInput() {
            const playlistOptions = this.$refs.playlistOptions as Record<any, any>

            playlistOptions.showInput()
        },

        handleFocusOut(e: FocusEvent) {
            const playListSelector = this.$refs.playListSelector as Record<any, any>

            if (e.target !== playListSelector) {
                // this.open = false
                /*
                    TODO: Make window close when clicked outside.
                    Known issue: click outside package doesn't work with vue 3.
                 */
            }
        }
    },

    created() {
        getPlaylists()
    },

    components: {FireIcon, PlaylistOptions, SmallArrowIcon, CollectionIcon, CreatePlaylistButton, BaseField}
})
</script>

<style scoped>
.playlist-actions {
    max-height: 0;
    opacity: 0;
    transition: max-height 100ms;
}

.playlist-actions.active {
    max-height: 800px;
    opacity: 1;
    transition: max-height 200ms ease-out, opacity 150ms ease;
}
</style>
