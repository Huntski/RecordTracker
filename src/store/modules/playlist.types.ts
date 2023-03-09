export type PlaylistId = number

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
    selectedPlaylist: Playlist | null = null
}
