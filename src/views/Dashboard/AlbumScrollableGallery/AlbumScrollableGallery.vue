<template>
    <div class="move-container">
        <div id="gallery" ref="gallery"></div>
    </div>
</template>

<script>
import './styles/bubblegallery.css'
import store from "@/store"
import {getAlbumCollection} from "@/services/albumService"
import {MovableGallery} from "@/views/Dashboard/AlbumScrollableGallery/compasables/MovableGallery";

export default {
    data() {
        return {
            rows: [],
            xTouchStartAt: 0,
            yTouchStartAt: 0,
            xPosition: 0,
            yPosition: 0,
            moveX: 0,
            moveY: 0,
            movableGallery: null
        }
    },

    computed: {
        albumCollection() {
            return store.getters['album/getAlbums']
        }
    },

    watch: {
        albumCollection(newAlbums, oldAlbums) {
            this.updateGallery()
        }
    },

    methods: {
        async updateGallery () {
            const collection = await this.albumCollection

            this.createAlbumElementsWithRowsAndColumns(collection)
        },

        openAlbum(id){
            store.commit('album/SET_REQUESTED_ALBUM_OVERVIEW', id)
        },

        createAlbumElementsWithRowsAndColumns(albums) {
            this.$refs.gallery.innerHTML = ''

            const albumsLimitPerRow = Math.floor(Math.sqrt(Object.keys(albums).length))

            for (const key in albums) {
                let rowToAddBubbleTo = null

                if (!this.rows.length) {
                    this.createRow([albums[key]])

                    continue
                }

                for (let a = 0; a < this.rows.length; a++) {

                    if (this.rows[a].bubblesAmount > albumsLimitPerRow && this.rows[a + 1] === undefined) {
                        this.createRow()
                        rowToAddBubbleTo = this.rows[this.rows.length - 1]
                        break
                    }

                    if (this.rows[a].bubblesAmount > albumsLimitPerRow) {
                        continue
                    }

                    rowToAddBubbleTo = this.rows[a]
                    break
                }

                this.addBubble(rowToAddBubbleTo, this.createBubble(albums[key]))
            }
        },

        createRow(bubbles = []) {
            const rowElement = document.createElement('div')
            rowElement.classList.add('row')

            const row = {
                element: rowElement,
                bubblesAmount: 0
            }

            if (bubbles) {
                bubbles.forEach(bubble => {
                    const bubbleElement = this.createBubble(bubble)

                    this.addBubble(row, bubbleElement)
                })
            }

            this.$refs.gallery.appendChild(rowElement)

            this.rows.push(row)
        },

        addBubble(row, element) {
            row.element.append(element)
            row.bubblesAmount++
        },

        createBubble(bubble = null) {
            const element = document.createElement('div')
            element.classList.add('bubble')
            element.dataset.id = bubble.id

            element.style.backgroundImage = `url(${bubble.cover_url})`

            element.onclick = (e) => {
                if (e.target === element) {
                    // this.openAlbum(bubble.id)

                    // this.movableGallery.moveBubbleToCenterOfScreen(element)
                }
            }

            return element
        },

        centerMostMiddleBubble() {
            const centerRow = this.rows[Math.round((this.rows.length - 1) / 2)]
            const bubbles = centerRow.element.getElementsByClassName('bubble')
            const centerBubble = bubbles[Math.round((bubbles.length - 1) / 2)]

            this.movableGallery.moveBubbleToCenterOfScreen(centerBubble)
        }
    },

    async mounted() {
        await getAlbumCollection()

        await this.updateGallery()
        this.movableGallery = new MovableGallery(this.$refs.gallery)

        this.movableGallery.initMouseEvents()

        this.centerMostMiddleBubble()
    },
}
</script>
