export type QueryDetails = {
  id: number;
  by: string;
  time: number;
  title?: string;
  text?: string;
  url: string;
  kids?: number[];
};

export interface queryProps {
  details: QueryDetails;
}

export interface paginationProps {
  storiesPerPage: number;
  totalStories: number;
  paginate: (pageNumber: number) => void;
}

export interface commentSectionProps {
  kids?: number[];
}

export const dateFormatter = function (seconds: number): string {
  let epoch = new Date(1970, 0, 1);
  const date = new Date(epoch.setSeconds(seconds));
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return `${date.toDateString()} ${hour}:${minutes}`;
};
