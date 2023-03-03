export type TrackId = number
export type Title = string

export interface Track {
    id: TrackId,
    title: Title,
    duration: string,
    position: string,
}
