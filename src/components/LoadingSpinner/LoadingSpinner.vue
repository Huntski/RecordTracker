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
    animation: spin 300ms infinite;
}

@keyframes spin {
    to {
        rotate: 360deg;
    }
}
</style>
