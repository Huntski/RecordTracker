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
    from {
        rotate: 0deg;
    }

    to {
        rotate: 360deg;
    }
}
</style>
