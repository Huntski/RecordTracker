export type ArtistId = number

export interface Artist {
    id: ArtistId,
    name: string,
    real_name: string,
    image_url: Url,
    bio: string
}

export interface NestedArtists {
    [key: string]: Artist
}

export class ArtistState {
    artists: NestedArtists = {}
}

