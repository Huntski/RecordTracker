import {NestedPlaylists, Playlist, PlaylistState, SelectedPlaylist} from "@/store/modules/playlist.types"

export default {
    namespaced: true,

    state: new PlaylistState(),

    getters: {
        getPlaylists(state: PlaylistState): NestedPlaylists {
            return state.playlists
        },

        getSelectedPlaylist(state: PlaylistState): SelectedPlaylist {
            return state.selectedPlaylist
        }
    },

    mutations: {
        SET_PLAYLIST(state: PlaylistState, payload: Playlist|Playlist[]): void {
            if (Array.isArray(payload)) {
                state.playlists = {}

                return payload.forEach(playlist => {
                    state.playlists[`playlist.${playlist.id}`] = playlist
                })
            }

            state.playlists[`playlist.${payload.id}`] = payload
        },

        SET_SELECTED_PLAYLIST(state: PlaylistState, payload: SelectedPlaylist): void {
            state.selectedPlaylist = payload
        }
    },
}
