<template>
    <div id="gallery" ref="gallery">
        <div
            v-for="row in rows"
            :key="row"
            class="row"
        >
            <div
                v-for="album in row"
                :key="album.id"
                class="bubble"
                :id="album.id"
                @click="openAlbum"
            >
                <img :src="album.cover_url" :alt="album.title" draggable="false" class="pointer-events-none">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import './styles/bubblegallery.css'
import store from "@/store"
import {getAlbumCollection} from "@/services/albumService"
import {MovableGallery} from "@/views/Dashboard/AlbumScrollableGallery/compasables/MovableGallery"
import {Album} from "@/store/modules/album.types"
import {defineComponent} from "vue"

type Row = Album[]

interface Data {
    albums: Album[]
    movableGallery: MovableGallery | undefined
}

export default defineComponent({
    data() {
        return {
            albums: [],
            movableGallery: undefined,
        } as Data
    },

    computed: {
        rows() {
            const albums = store.getters['album/getAlbums']
            const rows: Row[] = []

            const albumsLimitPerRow = Math.floor(Math.sqrt(Object.keys(albums).length))

            for (const album of albums) {
                let indexOfRow = null

                if (!rows.length) {
                    const row: Album[] = [album]

                    rows.push(row)

                    continue
                }

                for (let a = 0; a < rows.length; a++) {
                    if (rows[a].length > albumsLimitPerRow && !rows[a + 1]) {
                        rows.push([])
                        indexOfRow = rows.length - 1
                        break
                    }

                    if (rows[a].length > albumsLimitPerRow) {
                        continue
                    }

                    indexOfRow = a
                    break
                }

                if (indexOfRow !== null) {
                    rows[indexOfRow].push(album)
                }
            }

            return rows
        }
    },

    watch: {
        rows() {
            requestAnimationFrame(this.animateLoadIn)
        }
    },

    methods: {
        openAlbum(e: MouseEvent): void {
            const element = e.target as HTMLElement

            const id = element.id

            if (this.movableGallery) {
                if (!this.movableGallery.moving) {
                    this.$router.push({name: 'AlbumDetailPage', params: {id: id}})
                    this.movableGallery.moveBubbleToCenterOfScreen(element)
                }
            }
        },

        getCenterRow() {
            return this.rows[Math.round((this.rows.length - 1) / 2)]
        },

        getCenterBubble() {
            const bubbles = document.querySelectorAll('.bubble')
            return bubbles[Math.round((bubbles.length - 1) / 2)]
        },

        centerMostMiddleBubble() {
            if (this.movableGallery) {
                this.movableGallery.moveBubbleToCenterOfScreen(this.getCenterBubble())
            }
        },

        animateLoadIn() {
            setTimeout(() => {
                if (this.movableGallery) {
                    this.movableGallery.scaleBubblesWithSideOffset()
                }

                const bubbles = document.querySelectorAll('.bubble')
                let delay = 0

                bubbles.forEach(bubble => {
                    delay += 3

                    bubble.animate({
                        opacity: 1
                    }, {
                        duration: 300,
                        delay: delay,
                        fill: 'forwards'
                    })
                })
            }, 200)
        },
    },

    async mounted() {
        await getAlbumCollection()

        const gallery = this.$refs.gallery as Record<any, any>

        this.movableGallery = new MovableGallery(gallery)

        this.movableGallery.initMouseEvents()

        this.centerMostMiddleBubble()
    },
})
</script>
