export type PlaylistId = number
export type SelectedPlaylist = PlaylistId | 'collection'

export interface Playlist {
    id: PlaylistId,
    name: string,
    created_at: Date
}

export interface NestedPlaylists {
    [key: string]: Playlist,
}

export class PlaylistState {
    playlists: NestedPlaylists = {}
    selectedPlaylist: SelectedPlaylist = 'collection'
}
