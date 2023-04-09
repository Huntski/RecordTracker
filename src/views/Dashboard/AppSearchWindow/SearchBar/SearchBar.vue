<template>
    <div class="w-full flex items-center gap-5 px-5">
        <LoadingSpinner class="w-4" v-if="loading" />
        <SearchIcon class="w-4" v-else />

        <input type="text" :value="value" ref="searchbar" @input="handleInput" class="w-full outline-none rounded py-5" placeholder="Search for songs, albums, tracks...">
    </div>
</template>

<script>
import {SearchIcon} from "@/components/@icons"
import LoadingSpinner from "@/components/LoadingSpinner"

export default {
    props: {
        value: {
            type: String,
            required: true
        },

        loading: {
            type: Boolean,
            required: false
        }
    },

    methods: {
        handleInput(e) {
            this.$emit('update:value', e.target.value)
            this.$emit('search', e.target.value)
        },
    },

    mounted() {
        const searchbar = this.$refs.searchbar

        setTimeout(() => {
            searchbar.focus()
        }, 10)
    },

    components: {LoadingSpinner, SearchIcon}
}
</script>

<style scoped>
input {
    background: none;
}

input::placeholder {
    font-style: italic;
}
</style>
