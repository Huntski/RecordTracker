import axios from 'axios'
import {Album, AlbumId} from "@/store/modules/album.types"
import store from "@/store"

export interface ApiAlbumCollectionResponse {
    data: Array<Album>
}

export interface ApiAlbumResponse {
    data: Album
}

export async function getAlbumCollection(): Promise<void> {
    try {
        const result = await axios.get<ApiAlbumCollectionResponse>("/albums")

        store.commit('album/SET_ALBUM', result.data.data)
    } catch (e) {
        console.log(e)
    }
}

export async function getAlbum(id: AlbumId): Promise<void> {
    const result = await axios.get<ApiAlbumResponse>(`/albums/${id}`)

    store.commit('album/SET_ALBUM', result.data)
}

export async function getAlbumArtists(id: AlbumId): Promise<void> {
    const result = await axios.get<ApiAlbumResponse>(`/albums/${id}`)

    store.commit('album/SET_ARTISTS', result.data)
}
