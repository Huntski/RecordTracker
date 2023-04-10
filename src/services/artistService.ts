import {Artist, ArtistId} from "@/store/modules/artist.types"
import axios from "axios/index"
import {Album} from "@/store/modules/album.types"

interface ApiArtistResponse {
    data: Artist
}

interface ApiArtistAlbumsResponse {
    data: Album[]
}

export async function getArtist(id: ArtistId): Promise<Artist> {
    const result = await axios.get<ApiArtistResponse>(`/artists/${id}`)

    return result.data.data
}

export async function getArtistAlbums(id: ArtistId): Promise<Album[]> {
    const result = await axios.get<ApiArtistAlbumsResponse>(`/artists/${id}/albums`)

    return result.data.data
}
