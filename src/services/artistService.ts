import {Artist, ArtistId} from "@/store/modules/artist.types"
import axios from "axios/index"

interface ApiArtistResponse {
    data: Artist
}

export async function getArtist(id: ArtistId): Promise<Artist> {
    const result = await axios.get<ApiArtistResponse>(`/artists/${id}`)

    return result.data.data
}
