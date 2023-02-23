<template>
    <div class="move-container">
        <div ref="gallery"></div>
    </div>
</template>

<script>
import './styles/bubblegallery.css'
import store from "@/store"
import {getAlbumCollection} from "@/services/albumService";

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

            console.log('update gallery')

            this.createAlbumElementsWithRowsAndColumns(collection)
        },

        createAlbumElementsWithRowsAndColumns(albums) {
            console.log('create gallery', albums)

            this.$refs.gallery.innerHTML = ''

            const albumsLimitPerRow = Math.floor(Math.sqrt(Object.keys(albums).length))

            for (const key in albums) {
                let rowToAddBubbleTo = null

                if (!this.rows.length) {
                    console.log('Create new row')
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
            console.log('Create row')

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

            return element
        },
    },

    async mounted() {
        await getAlbumCollection()

        this.updateGallery()
    }
}
</script>
