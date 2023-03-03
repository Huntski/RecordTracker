import {Artist, ArtistState, NestedArtists} from "@/store/modules/artist.types";

export default {
    namespaced: true,

    state: new ArtistState(),

    getters: {
        getArtists(state: ArtistState): NestedArtists {
            return state.artists
        }
    },

    mutations: {
        SET_ARTIST(state: ArtistState, payload: Artist|Array<Artist>): void {
            if (Array.isArray(payload)) {
                payload.forEach(artist => {
                    const id = `artist.${artist.id}`

                    state.artists[id] = artist
                })

                return
            }

            const id = `artist.${payload.id}`
            state.artists[id] = payload
        }
    },
}
