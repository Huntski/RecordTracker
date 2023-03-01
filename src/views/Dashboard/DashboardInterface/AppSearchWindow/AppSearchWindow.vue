<template>
    <div
        class="absolute z-20 top-0 left-0 right-0 w-full h-full flex flex-col items-center"
        :class="{'hidden' : !open}"
    >
        <div class="bg-overlay absolute top-0 left-0 w-full h-full" @click="toggleWindow"></div>

        <div class="relative max-w-3xl z-20 w-full mt-20">
            <BaseField class="w-full">
                <SearchBar v-model:value="searchQuery" @search="handleSearchEvent" />

                <div class="bottom-line" v-show="showResults"></div>

                <div class="base-scrollbar max-h-96 m-2 overflow-auto px-3" v-show="showResults">
                    <ArtistSearchResults class="hidden" :artists="searchResults.artists" />

                    <AlbumSearchResults :albums="searchResults.albums" />
                </div>
            </BaseField>
        </div>
    </div>
</template>

<script>
import SearchBar from "@/views/Dashboard/DashboardInterface/AppSearchWindow/SearchBar"
import {BaseField} from "@/components/@fields"
import AlbumSearchResults from "@/views/Dashboard/DashboardInterface/AppSearchWindow/AlbumSearchResults"
import ArtistSearchResults from "@/views/Dashboard/DashboardInterface/AppSearchWindow/ArtistSearchResults"
import {globalSearchRequest} from "@/services/searchService"

export default {
    data() {
        return {
            searchResults: {
                artists: [],
                albums: []
            },

            searchQuery: '',

            open: false,
        }
    },

    computed: {
        showResults() {
            return this.searchResults.artists.length || this.searchResults.albums.length
        }
    },

    methods: {
        async handleSearchEvent(query) {
            if (!query) {
                this.searchResults.albums = []
                this.searchResults.artists = []

                return
            }

            const results = await globalSearchRequest(query)

            this.searchResults.artists = results.data.artists
            this.searchResults.albums = results.data.albums

            console.log(this.searchResults)
        },

        toggleWindow() {
            this.open = !this.open
        },

        closeWindow() {
            this.open = false
            this.searchQuery = ''
        },

        handleKeyPressEvent(e) {
            if (e.key === 'Escape') {
                this.open = false

                document.querySelector('body').removeEventListener('keydown', this.handleKeyPressEvent)
            }
        }
    },

    created() {
        document.addEventListener('keydown', this.handleKeyPressEvent)
    },

    components: {SearchBar, BaseField, AlbumSearchResults, ArtistSearchResults}
}
</script>

<style>
.bg-overlay {
    background: #00000090;
}

.bottom-line {
    @apply m-auto rounded mx-5 mb-5;
    background: #3C3C3C;
    height: 0.15rem;

}
</style>
