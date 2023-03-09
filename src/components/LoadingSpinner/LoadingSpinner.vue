<template>
    <SpinnerIcon class="spinner" />
</template>

<script>
import {SpinnerIcon} from "@/components/@icons"

export default {
    components: {SpinnerIcon}
}
</script>

<style>
.spinner {
    animation: spin 500ms linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
