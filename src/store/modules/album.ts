import {Album, AlbumId, AlbumState, NestedAlbums} from "@/store/modules/album.types"

export default {
    namespaced: true,

    state: new AlbumState(),

    getters: {
        getAlbums(state: AlbumState): NestedAlbums {
            return state.albums
        },

        getRequestedAlbumId(state: AlbumState): AlbumId|undefined {
            return state.requestedAlbumId
        },
    },

    mutations: {
        SET_ALBUM(state: AlbumState, payload: Album|Array<Album>): void {
            if (Array.isArray(payload)) {

                payload.forEach(album => {
                    const id = `album.${album.id}`

                    state.albums[id] = album
                })

                return
            }

            const id = `album.${payload.id}`
            state.albums[id] = payload
        },

        SET_REQUESTED_ALBUM_OVERVIEW(state: AlbumState, albumId: AlbumId|undefined): void {
            state.requestedAlbumId = albumId
        }
    },
}
