<template>
    <div>
        <div v-for="artist in artists" :key="artist.id">
            {{ artist.id }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        artists: {
            type: Object,
            required: false,
        }
    },
}
</script>
