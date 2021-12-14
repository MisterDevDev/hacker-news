export type StoryDetails = {
  id: number;
  by: string;
  time: number;
  url: string;
  title: string;
  score: number;
  kids?: number[];
};

export type CommentDetails = {
  id: number;
  by: string;
  time: number;
  text: string;
  kids?: number[];
}

export interface paginationProps {
  storiesPerPage: number;
  totalStories: number;
  paginate: (pageNumber: number) => void;
}

export const dateFormatter = function (seconds: number): string {
  let epoch = new Date(1970, 0, 1);
  const date = new Date(epoch.setSeconds(seconds));
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return `${date.toDateString()} ${hour}:${minutes}`;
};
