import React, { useState } from "react";
import { StoryDetails, dateFormatter } from "../../types/component";
import CommentSection from "./CommentSection";

interface story {
  details: StoryDetails;
}

const Story: React.FC<story> = ({ details }) => {
  const [showComments, setComments] = useState(false);

  const toggleComments = () => {
    setComments(!showComments);
  };

  const { title, url, time, by, kids } = details;
  const timeStamp = dateFormatter(time);
  return (
    <div className="story-container">
      <div className="story-header">
        {url ? (
          <h3>
            <a href={`${url}`} target="_blank">
              {title}
            </a>
          </h3>
        ) : (
          <h3>{title}</h3>
        )}
        <div className="flex-column-space">
          <b className="underline">{`Author: ${by}`}</b>
          <br />
          <small>{timeStamp}</small>
        </div>
      </div>
      {kids ? (
        <div>
          {showComments ? (
            <div className="spacer">
              <span onClick={toggleComments}>
                <i className="fa fa-comments" aria-hidden="true"></i>{" "}
                <b className="hoover">Close Comments</b>
              </span>
              <div className="comment-container">
                <CommentSection kids={kids} />
              </div>
            </div>
          ) : (
            <span onClick={toggleComments}>
              <i className="fa fa-comments" aria-hidden="true">
                {" "}
                <b className="hoover">View Comments{`(${kids.length})`}</b>
              </i>
            </span>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Story;
