import axios from 'axios'
import {Album, AlbumId} from "@/store/modules/album.types"
import store from "@/store"
import {Artist} from "@/store/modules/artist.types"
import {Track} from "@/store/modules/track.types"

export interface ApiAlbumCollectionResponse {
    data: Album[]
}

export interface ApiAlbumResponse {
    data: Album
}

export interface ApiAlbumArtistsResponse {
    data: Artist[]
}

export interface ApiAlbumTracksResponse {
    data: Track[]
}

export async function getAlbumCollection(): Promise<void> {
    try {
        const result = await axios.get<ApiAlbumCollectionResponse>("/albums")

        store.commit('album/SET_COLLECTION', result.data.data)
    } catch (e) {
        console.log(e, typeof e)
    }
}

export async function getAlbum(id: AlbumId): Promise<Album> {
    const result = await axios.get<ApiAlbumResponse>(`/albums/${id}`)

    return result.data.data
}

export async function getAlbumArtists(id: AlbumId): Promise<Artist[]> {
    const result = await axios.get<ApiAlbumArtistsResponse>(`/albums/${id}/artists`)

    return result.data.data
}

export async function getAlbumTracks(id: AlbumId): Promise<Track[]> {
    const result = await axios.get<ApiAlbumTracksResponse>(`/albums/${id}/tracks`)

    return result.data.data
}

export async function searchAlbum(query: string): Promise<Album[]> {
    const url =`/albums/search?search_query=${query}`

    const result = await axios.get<ApiAlbumCollectionResponse>(url)

    return result.data.data
}
