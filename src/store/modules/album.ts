import {Album, AlbumState} from "@/store/modules/album.types"

export default {
    namespaced: true,

    state: new AlbumState(),

    getters: {
        getAlbums(state: AlbumState): Album[] {
            return state.albums
        },
    },

    mutations: {
        SET_COLLECTION(state: AlbumState, payload: Album[]): void {
            state.albums = payload
        },
    },
}
