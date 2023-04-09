import axios, {AxiosError, AxiosResponse} from "axios"
import store from "@/store"
import {Playlist} from "@/store/modules/playlist.types"
import {Album} from "@/store/modules/album.types"

export interface ApiPlaylistCollectionResponse {
    data: Playlist[]
}

export interface ApiPlaylistAlbumsResponse {
    data: Album[]
}

export interface ApiCreatePlaylistResponse {
    data: Playlist
}

export async function getPlaylists(): Promise<void> {
    try {
        const result = await axios.get<ApiPlaylistCollectionResponse>('playlists')

        store.commit('playlist/SET_PLAYLIST', result.data.data)
    } catch (e) {
        console.error(e)
    }
}

export function selectPlaylist(playlist: Playlist): void {
    try {
        store.commit('playlist/SET_SELECTED_PLAYLIST', playlist)
    } catch (e) {
        console.error(e)
    }
}

export async function getAlbumsFromPlaylist(playlist: Playlist): Promise<void> {
    try {
        const result = await axios.get<ApiPlaylistAlbumsResponse>(`/playlists/${playlist.id}/albums`)

        store.commit('album/SET_COLLECTION', result.data.data)
    } catch (e) {
        console.error(e)
    }
}

export interface ApiCreatePlaylistError extends AxiosResponse {
    data: {
        name: string[]
    }
}

export async function createPlaylist(name: string): Promise<AxiosResponse|ApiCreatePlaylistError> {
    try {
        const result = await axios.post<ApiCreatePlaylistResponse>(`/playlists`, {
            name: name
        })

        store.commit('playlist/SET_PLAYLIST', result.data.data)

        return result
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response as ApiCreatePlaylistError
        }
        throw new error
    }
}
