import axios from 'axios'
import {Album, AlbumId} from "@/store/modules/album.types"
import store from "@/store"
import {Artist} from "@/store/modules/artist.types";
import {Track} from "@/store/modules/track.types";

export interface ApiAlbumCollectionResponse {
    data: Array<Album>
}

export interface ApiAlbumResponse {
    data: Album
}

export interface ApiAlbumArtistsResponse {
    data: Array<Artist>
}

export interface ApiAlbumTracksResponse {
    data: Array<Track>
}

export async function getAlbumCollection(): Promise<void> {
    try {
        const result = await axios.get<ApiAlbumCollectionResponse>("/albums")

        store.commit('album/SET_ALBUM', result.data.data)
    } catch (e) {
        console.log(e)
    }
}

export async function getAlbum(id: AlbumId): Promise<Album> {
    const result = await axios.get<ApiAlbumResponse>(`/albums/${id}`)

    store.commit('album/SET_ALBUM', result.data)

    return result.data.data
}

export async function getAlbumArtists(id: AlbumId): Promise<Array<Artist>> {
    const result = await axios.get<ApiAlbumArtistsResponse>(`/albums/${id}/artists`)

    return result.data.data
}

export async function getAlbumTracks(id: AlbumId): Promise<Array<Track>> {
    const result = await axios.get<ApiAlbumTracksResponse>(`/albums/${id}/tracks`)

    return result.data.data
}

export async function searchAlbum(query: string): Promise<Array<Album>> {
    const url =`/albums/search?search_query=${query}`

    const result = await axios.get<ApiAlbumCollectionResponse>(url)

    return result.data.data
}
