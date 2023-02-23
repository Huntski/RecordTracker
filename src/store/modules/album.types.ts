export type AlbumId = number

export interface Album {
    id: number,
    title: string,
    year: number,
    origin: string,
    comment: string,
    cover_url: Url
}

export interface NestedAlbums {
    [key: string]: Album
}

export class AlbumState {
    albums: NestedAlbums = {}
}