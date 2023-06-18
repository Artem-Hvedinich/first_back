import { availableResolutionsType, VideoType } from "../../router/videos/videos-router";

const videosDB: VideoType[] = [];
export const videosRepository = {
    findVideos: async (id?: number): Promise<VideoType[] | VideoType | null> => {
      const result = videosDB.filter(f => f.id === id);
      return id
        ? result.length ? result[0] : null
        : videosDB;
    },
    createVideos: async (title: string,
                         author: string,
                         availableResolutions: availableResolutionsType[])
      : Promise<VideoType | null> => {
      const newVideo = <VideoType>{
        id: +(new Date().getMilliseconds()),
        title: title.trim(),
        author: author.trim(),
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions
      };
      videosDB.push(newVideo);
      return await newVideo;
    }
  }
;
