import { availableResolutionsType, VideoType } from "../../router/videos/videos-router";

type updateData = {
  title: string,
  author: string,
  availableResolutions: availableResolutionsType,
  canBeDownloaded: boolean,
  minAgeRestriction: null | number,
  publicationDate: string
}

export let videosDB: VideoType[] = [
  // {
  //   "id": 391,
  //   "title": "first",
  //   "author": "Kate",
  //   "canBeDownloaded": false,
  //   "minAgeRestriction": null,
  //   "createdAt": "2023-06-18T18:30:42.391Z",
  //   "publicationDate": "2023-06-19T18:30:42.391Z",
  //   "availableResolutions": [
  //     "P144",
  //     "P240",
  //     "P360"
  //   ]
  // }
];
export const videosRepository = {
  findVideos: async (id?: number): Promise<VideoType[] | VideoType | undefined> =>
    id ? videosDB.find(f => f.id === id) : videosDB,

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
      publicationDate: new Date(Date.now() + (3600 * 1000 * 24)).toISOString(),
      availableResolutions
    };
    videosDB.push(newVideo);
    return await newVideo;
  },
  updateVideos: async (data: updateData, id: number): Promise<boolean> => {
    videosDB = videosDB.map(m => m.id === id ? <VideoType>{
      ...m,
      title: data.title,
      author: data.author,
      availableResolutions: data.availableResolutions,
      canBeDownloaded: data.canBeDownloaded,
      minAgeRestriction: data.minAgeRestriction,
      publicationDate: data.publicationDate
    } : m);
    return await true;
  },
  removeOneVideo: async (id: number): Promise<boolean> => {
    videosDB = videosDB.filter(f => f.id !== id);
    return await true;
  },
  removeAllVideos: async (): Promise<boolean> => {
    videosDB = [];
    return await true;
  }
};

