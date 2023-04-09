<template>
    <PopupModal>
        <BackgroundOverlay @click="closeWindow" />

        <div class="relative max-w-3xl z-20 w-full mt-20">
            <BaseField class="mx-5">
                <SearchBar v-model:value="searchQuery" @search="handleSearchEvent" :loading="loading" />

                <div class="bottom-line"></div>

                <div class="flex items-center gap-3 px-5 py-5">
                    <SearchFilterButton v-model:selectedFilter="selectedFilter" filter="albums">
                        <NoteIcon />
                        <span>Albums</span>
                    </SearchFilterButton>

                    <SearchFilterButton v-model:selectedFilter="selectedFilter" filter="artists">
                        <ArtistIcon />
                        <span>Artists</span>
                    </SearchFilterButton>
                </div>

                <div
                    class="search-results overflow-y-scroll base-scrollbar"
                    :class="{'active' : showResults}"
                    ref="searchResults"
                >
                    <div class="mx-2 px-3 pb-5" v-show="showResults" ref="searchResultItems">
                        <ArtistSearchResults
                            @close="closeWindow"
                            class="mb-5"
                            :artists="searchResults.artists"
                            v-show="searchResults.artists.length"
                            :fitler="selectedFilter"
                        />

                        <AlbumSearchResults
                            @close="closeWindow"
                            :albums="searchResults.albums"
                            :fitler="selectedFilter"
                        />

                        <div v-show="noResultsReturned" class="px-6 font-bold text-gray-200">No results matched your search.</div>
                    </div>
                </div>
            </BaseField>
        </div>
    </PopupModal>
</template>

<script>
import SearchBar from "@/views/Dashboard/AppSearchWindow/SearchBar"
import {BaseField} from "@/components/@fields"
import AlbumSearchResults from "@/views/Dashboard/AppSearchWindow/AlbumSearchResults"
import ArtistSearchResults from "@/views/Dashboard/AppSearchWindow/ArtistSearchResults"
import {NoteIcon, ArtistIcon} from "@/components/@icons"
import SearchFilterButton from "@/views/Dashboard/AppSearchWindow/SearchFilterButton"
import BackgroundOverlay from "@/components/BackgroundOverlay"
import PopupModal from "@/components/PopupModal/PopupModal.vue"
import {globalSearchRequest} from "@/services/searchService"

export default {
    data() {
        return {
            searchResults: {
                artists: [],
                albums: []
            },

            selectedFilter: null,
            searchQuery: '',
            loading: false,
            typingInterval: null,
        }
    },

    watch: {
        selectedFilter() {
            this.handleSearchEvent()
        }
    },

    computed: {
        showResults() {
            return this.searchResults.artists.length || this.searchResults.albums.length
        },

        noResultsReturned() {
            return !this.searchResults.artists.length && !this.searchResults.albums.length && !this.loading
        }
    },

    methods: {
        setFilter(filter) {
            if (this.selectedFilter === filter) {
                return this.selectedFilter = ''
            }

            this.selectedFilter = filter
        },

        resetHeight() {
            this.$refs.searchResults.style.minHeight = `0`
            this.$refs.searchResults.style.maxHeight = `0`
        },

        updateHeight() {
            const rect = this.$refs.searchResultItems.getBoundingClientRect()

            if (rect.height > 500) {
                this.$refs.searchResults.style.minHeight = `500px`
                this.$refs.searchResults.style.maxHeight = `500px`
            }

            if (rect.height < 500) {
                this.$refs.searchResults.style.maxHeight = `${rect.height}px`
                this.$refs.searchResults.style.minHeight = `${rect.height}px`
            }
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

                    this.resetHeight()
                } else {
                    await globalSearchRequest(this.searchQuery).then(results => {
                        this.searchResults.artists = results.artists
                        this.searchResults.albums = results.albums

                        this.$nextTick(this.updateHeight)
                    })
                }
            } catch (e) {
                this.searchResults.albums = []
                this.searchResults.artists = []

                this.resetHeight()
            }
        },

        closeWindow() {
            this.$router.push({name: 'Dashboard'})
        },

        handleKeyPressEvent(e) {
            if (e.key === 'Escape') {
                this.$router.push({name: 'Dashboard'})
            }
        }
    },

    created() {
        document.addEventListener('keydown', this.handleKeyPressEvent)
    },

    components: {PopupModal, ArtistIcon, SearchBar, BaseField, AlbumSearchResults, ArtistSearchResults, NoteIcon, SearchFilterButton, BackgroundOverlay}
}
</script>

<style scoped>
.search-results {
    max-height: 0;
    transition: max-height 100ms ease-out, min-height 100ms ease-out;
}

.bottom-line {
    @apply m-auto rounded mx-5;
    background: #3C3C3C;
    height: 0.15rem;
}
</style>
