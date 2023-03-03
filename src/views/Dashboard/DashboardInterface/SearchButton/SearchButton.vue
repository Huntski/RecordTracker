<template>
    <BaseButton :rounded="true">
        <SearchIcon class="w-14 p-4" />
    </BaseButton>
</template>

<script>
import {BaseButton} from "@/components/@buttons"
import {SearchIcon} from "@/components/@icons"

export default {
    components: {SearchIcon, BaseButton}
}
</script>
