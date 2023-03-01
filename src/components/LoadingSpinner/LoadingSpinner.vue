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
    animation: spin 1s infinite;
}

@keyframes spin {
    to {
        rotate: 360deg;
    }
}
</style>
