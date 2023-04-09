<template>
    <BaseField @focusout="handleFocusOut" tabindex="0" ref="playListSelector">
        <div class="playlist-actions flex flex-col overflow-hidden transition" :class="{'active': open}">
            <DefaultMenuOption @click="selectFullCollection" :active="selectedPlaylist === 'collection'">
                <CollectionIcon class="w-4" />

                <span>Your Collection</span>
            </DefaultMenuOption>

            <DefaultMenuOption>
                <FireIcon class="w-4" />

                <span>Recently added</span>
            </DefaultMenuOption>

            <CreatePlaylistButton @click="openPlaylistInput" />

            <PlaylistOptions ref="playlistOptions" />
        </div>

        <button class="flex outline-none justify-between items-center p-4 font-major font-bold w-60" @click="open = !open">
            <span>Playlists</span>

            <SmallArrowIcon class="w-3 transform" :class="{'rotate-180' : !open}" />
        </button>
    </BaseField>
</template>

<script lang="ts">
import {CollectionIcon, FireIcon, SmallArrowIcon} from "@/components/@icons"
import {BaseField} from "@/components/@fields"
import PlaylistOptions from "@/views/Dashboard/DashboardInterface/PlayListSelecter/PlaylistOptions"
import CreatePlaylistButton from "@/views/Dashboard/DashboardInterface/PlayListSelecter/CreatePlaylistButton.vue"
import DefaultMenuOption from "@/views/Dashboard/DashboardInterface/PlayListSelecter/PlaylistOptions/DefaultMenuOption"
import {defineComponent} from "vue"
import {SelectedPlaylist} from "@/store/modules/playlist.types"
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
        selectedPlaylist(): SelectedPlaylist {
            return store.getters['playlist/getSelectedPlaylist']
        },
    },

    methods: {
        selectFullCollection() {
            store.commit('playlist/SET_SELECTED_PLAYLIST', "collection")

            getAlbumCollection()
        },

        openPlaylistInput() {
            const playlistOptions = this.$refs.playlistOptions as Record<any, any>

            playlistOptions.showInput()
        },

        closePlaylistInput() {
            const playlistOptions = this.$refs.playlistOptions as Record<any, any>

            playlistOptions.closeInput()
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

    mounted() {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Escape' && this.open) {
                this.open = false
            }
        })
    },

    created() {
        getPlaylists()
    },

    components: {FireIcon, PlaylistOptions, SmallArrowIcon, CollectionIcon, CreatePlaylistButton, BaseField, DefaultMenuOption}
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
