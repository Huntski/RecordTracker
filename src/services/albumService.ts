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

export async function getAlbum(id: AlbumId): Promise<ApiAlbumResponse> {
    const result = await axios.get<ApiAlbumResponse>(`/albums/${id}`)

    store.commit('album/SET_ALBUM', result.data)

    return result.data
}

export async function getAlbumArtists(id: AlbumId): Promise<void> {
    const result = await axios.get<ApiAlbumResponse>(`/albums/${id}`)

    store.commit('album/SET_ARTISTS', result.data)
}

export async function searchAlbum(query: string): Promise<ApiAlbumCollectionResponse> {
    const url =`/albums/search?search_query=${query}`

    const result = await axios.get<ApiAlbumCollectionResponse>(url)

    return result.data
}
