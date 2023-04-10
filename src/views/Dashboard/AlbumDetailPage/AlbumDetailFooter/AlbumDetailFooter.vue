<template>
    <footer class="sticky bottom-0 z-10 bg-[#222222] text-gray-300 right-0 p-8 box-border flex justify-between items-center w-full">
        <button class="flex items-center gap-3 hover:text-white">
            <ShopIcon class="w-5" />
            <span>No.1 Hotwax Records</span>
        </button>

        <button class="flex items-center gap-3 hover:text-white">
            <span>BOUGHT BY <strong>Bamspeem</strong></span>
        </button>
    </footer>
</template>

<script lang="ts" setup>
import {ShopIcon} from "@/components/@icons"
</script>
