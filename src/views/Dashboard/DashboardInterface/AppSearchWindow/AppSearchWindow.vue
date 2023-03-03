<template>
    <div
        class="absolute z-20 top-0 left-0 right-0 w-full h-full flex flex-col items-center"
        :class="{'hidden' : !open}"
    >
        <BackgroundOverlay @click="closeWindow" />

        <div class="search-base-field relative max-w-3xl z-20 w-full mt-20" :class="{'active' : showResults || noResultsReturned}">
            <BaseField>
                <SearchBar v-model:value="searchQuery" @search="handleSearchEvent" :loading="loading" />

                <div class="bottom-line"></div>

                <div class="grid gap-5 py-5">
                    <div class="flex items-center gap-3 px-5">
                        <SearchFilterButton :active="selectedFilter === 'albums'" @click="setFilter('albums')">
                            <NoteIcon />
                            <span>Albums</span>
                        </SearchFilterButton>

                        <SearchFilterButton :active="selectedFilter === 'artists'" @click="setFilter('artists')">
                            <ArtistIcon />
                            <span>Artists</span>
                        </SearchFilterButton>
                    </div>

                    <div class="base-scrollbar search-results mx-2 overflow-auto px-3" v-show="showResults">
                        <ArtistSearchResults @close="closeWindow" class="mb-5" :artists="searchResults.artists" v-show="searchResults.artists.length" />

                        <AlbumSearchResults @close="closeWindow" :albums="searchResults.albums" />
                    </div>

                    <div v-if="noResultsReturned" class="px-6 text-sm font-bold text-gray-200">No results matched your search.</div>
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
import {NoteIcon, ArtistIcon} from "@/components/@icons"
import SearchFilterButton from "@/views/Dashboard/DashboardInterface/AppSearchWindow/SearchFilterButton"
import BackgroundOverlay from "@/components/BackgroundOverlay"

export default {
    data() {
        return {
            searchResults: {
                artists: [],
                albums: []
            },

            selectedFilter: '',

            searchQuery: '',

            open: false,

            loading: false,

            typingInterval: null,
        }
    },

    watch: {
        selectedFilter(newFilter) {
            this.handleSearchEvent()
        }
    },

    computed: {
        showResults() {
            return this.searchResults.artists.length || this.searchResults.albums.length
        },

        noResultsReturned() {
            return !this.searchResults.artists.length && !this.searchResults.albums.length && this.searchQuery.length && !this.loading
        }
    },

    methods: {
        setFilter(filter) {
            if (this.selectedFilter === filter) {
                return this.selectedFilter = ''
            }

            this.selectedFilter = filter
        },

        handleSearchEvent() {
            this.loading = true

            this.requestSearch()

            if (this.typingInterval === null) {
                clearTimeout(this.typingInterval)
            }

            this.typingInterval = setTimeout(() => {
                this.typingInterval = null

                this.loading = false
            }, 800)
        },

        async requestSearch() {
            try {
                if (!this.searchQuery) {
                    this.searchResults.albums = []
                    this.searchResults.artists = []
                } else {
                    const results = await globalSearchRequest(this.searchQuery)

                    this.searchResults.artists = results.artists
                    this.searchResults.albums = results.albums
                }
            } catch (e) {
                this.searchResults.albums = []
                this.searchResults.artists = []
            }
        },

        toggleWindow() {
            this.open = !this.open
        },

        openWindow() {
            this.resetAllFields()
            this.open = true
        },

        resetSearchResults() {
            this.searchResults.albums = []
            this.searchResults.artists = []
        },

        resetAllFields() {
            this.open = false
            this.searchQuery = ''
            this.selectedFilter = ''
            this.resetSearchResults()
        },

        closeWindow() {
            this.open = false
            this.resetAllFields()
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

    components: {ArtistIcon, SearchBar, BaseField, AlbumSearchResults, ArtistSearchResults, NoteIcon, SearchFilterButton, BackgroundOverlay}
}
</script>

<style>
.search-base-field {
    max-height: 200px;
    overflow: hidden;
    transition: max-height 300ms ease-out;
}

.search-base-field.active {
    max-height: 80vh;
}

.search-results {
    max-height: 50vh;
}

.bottom-line {
    @apply m-auto rounded mx-5;
    background: #3C3C3C;
    height: 0.15rem;
}
</style>
