import axios from "axios/index";
import {Album} from "@/store/modules/album.types";
import {Artist} from "@/store/modules/artists.types";

export interface ApiSearchResponse {
    data: ApiSearchResponseData
}

export interface ApiSearchResponseData {
    artists: Array<Artist>,
    albums: Array<Album>,
}

export async function globalSearchRequest(query: string): Promise<ApiSearchResponse> {
    const url =`/search?search_query=${query}`

    const result = await axios.get<ApiSearchResponse>(url)

    return result.data
}
