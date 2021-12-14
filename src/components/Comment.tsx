import React, { useState } from "react";
import { CommentDetails, dateFormatter } from "../../types/component";
import CommentSection from "./CommentSection";

interface comment {
  details: CommentDetails;
}

const Comment: React.FC<comment> = ({ details }) => {
  const [moreComments, toggleMoreComments] = useState(false);
  const { text, time, by, kids } = details;

  const openComments = () => {
    toggleMoreComments(!moreComments);
  };

  const timeStamp = dateFormatter(time);

  return (
    <div className="comment">
      <div style={{ marginBottom: "1rem" }}>
        <b className="underline">{`Comment by: ${by}`}</b>
      </div>
      <div>
        {text ? <div dangerouslySetInnerHTML={{ __html: text }} /> : ""}
        <div className="flex-end">
          <small>{timeStamp}</small>
        </div>
      </div>
      {moreComments ? (
        <div>
          <div onClick={openComments}>
            {" "}
            <b className="hoover">Close Replies</b>{" "}
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <i
              className="fa fa-level-down"
              style={{ margin: "1rem 1rem" }}
              aria-hidden="true"
            ></i>
            <CommentSection kids={kids} />
          </div>
        </div>
      ) : (
        <div>
          {kids ? (
            <div onClick={openComments}>
              {" "}
              <b className="hoover">View Replies{`(${kids.length})`}</b>{" "}
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;
