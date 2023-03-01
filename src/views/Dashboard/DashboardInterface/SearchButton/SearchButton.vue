<template>
    <BaseField :rounded="true">
        <SearchIcon class="w-14 p-4" />
    </BaseField>
</template>

<script>
import BaseField from "@/components/@fields/BaseField"
import {SearchIcon} from "@/components/@icons"

export default {
    components: {SearchIcon, BaseField}
}
</script>
