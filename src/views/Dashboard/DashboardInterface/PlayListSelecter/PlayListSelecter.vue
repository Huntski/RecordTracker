<template>
    <BaseField>
        <div class="flex flex-col overflow-hidden hide-mobile transition" :class="{'hidden': !open}">
            <CreatePlaylistButton />

            <PlaylistOptions :options="items" />
        </div>

        <button class="flex items-center p-4 gap-10 font-major font-bold" @click="open = !open">
            <span>Playlists</span>

            <SmallArrowIcon class="w-3 transform" :class="{'rotate-180' : !open}" />
        </button>
    </BaseField>
</template>

<script>
import {SmallArrowIcon} from "@/components/@icons"
import {BaseField} from "@/components/@fields"
import PlaylistOptions from "@/views/Dashboard/DashboardInterface/PlayListSelecter/PlaylistOptions"
import CreatePlaylistButton from "@/views/Dashboard/DashboardInterface/PlayListSelecter/CreatePlaylistButton"

export default {
    data() {
        return {
            items: [
                'Electric Swing',
                'Christmas Classics',
                'Rdio Dance Music',
                '99 Beloved',
                'Rdio4',
                'Jazz',
                'RdioBackLog',
                'Top2000',
                '30 days',
                'Rdio4',
                'Jazz/Swing',
                'Drum & Bass'
            ],

            open: false,
        }
    },

    components: {PlaylistOptions, SmallArrowIcon, CreatePlaylistButton, BaseField}
}
</script>
