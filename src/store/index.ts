import { createStore } from 'vuex'
import album from "@/store/modules/album"
import artist from "@/store/modules/artist"
import playlist from "@/store/modules/playlist"

export default createStore({
  modules: {
    album,
    artist,
    playlist,
  }
})
