import {Genre} from "@/store/modules/genre.types"

export type AlbumId = number|string

export interface Album {
    id: number,
    title: string,
    year: number,
    origin: string,
    comment: string,
    cover_url: Url,
    genres?: Genre[]
}

export interface NestedAlbums {
    [key: string]: Album
}

export class AlbumState {
    albums: Album[] = []
}
