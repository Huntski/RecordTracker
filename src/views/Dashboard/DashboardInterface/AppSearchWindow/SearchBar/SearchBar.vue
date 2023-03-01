<template>
    <div class="w-full flex items-center gap-5 p-5">
        <SpinnerIcon v-if="loading" />
        <SearchIcon class="w-4" v-else />

        <input :value="value" ref="searchbar" @input="handleInput" class="w-full outline-none rounded pb-0.5" placeholder="Search for songs, albums, tracks...">
    </div>
</template>
<script>
import {SearchIcon} from "@/components/@icons"

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
            this.$emit('search', e.target.value)
        }
    },

    mounted() {
        this.$refs.searchbar.focus()
    },

    components: {SearchIcon}
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
