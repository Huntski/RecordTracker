<template>
    <ul class="base-scrollbar flex flex-col text-left text-xs py-2 text-gray-400 max-h-80 overflow-y-scroll">
        <li
            v-for="playlist in options"
            :key="playlist"
            class="hover:text-white py-1.5 px-4"
        >{{playlist}}</li>
    </ul>
</template>

<script>
export default {
    props: {
        options: {
            type: [Array, Object],
            required: true,
        }
    }
}
</script>
