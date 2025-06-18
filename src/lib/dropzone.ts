import toast from 'react-hot-toast';

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio'
}

export const acceptTypeString = {
  [MediaType.IMAGE]: ['png', 'jpg', 'jpeg', 'webp', 'gif'],
  [MediaType.VIDEO]: ['mp4', 'gif', 'webm'],
  [MediaType.AUDIO]: ['mp3', 'wav', 'webm'],
};

export const createHandleDropFile = (
  action: (file: File) => void
) => {
  return async (file: File): Promise<
    | { status: 'success'; result: string }
    | { status: 'error'; error: string }
  > => {
    if (!(acceptTypeString.image).some((item) => file.type.includes(item))) {
      toast.error(`Chỉ hỗ trợ các file ${acceptTypeString.image.join(', ')}`);
      return {
        status: 'error',
        error: 'Không hỗ trợ file này',
      };
    }

    action(file);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      status: 'success',
      result: URL.createObjectURL(file),
    };
  };
};