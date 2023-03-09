<template>
    <BaseButton :rounded="true" @click="openSearchWindow">
        <SearchIcon class="w-14 p-4" />
    </BaseButton>
</template>

<script lang="ts">
import {BaseButton} from "@/components/@buttons"
import {SearchIcon} from "@/components/@icons"
import router from "@/router"

export default {
    methods: {
        openSearchWindow(): void {
            router.push({name: 'AppSearchWindow'})
        }
    },

    components: {SearchIcon, BaseButton}
}
</script>
