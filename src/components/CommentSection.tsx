import React, { useState, useEffect } from "react";
import { CommentDetails } from "../../types/component";
import axios from "axios";

import Comment from "./Comment";

interface commentSectionProps {
  kids?: number[];
}

const CommentSection: React.FC<commentSectionProps> = ({ kids }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios.post("/api/comments", kids);
      setComments(data);
      setLoading(true);
    })();
  }, []);

  return (
    <div className="comment-block">
      {loading ? (
        <div>
          {comments.map((comment: CommentDetails) => {
            return <Comment key={comment.id} details={comment} />;
          })}
        </div>
      ) : (
        <div>
          <i className="fa fa-clock-o" aria-hidden="true"></i>Loading...
        </div>
      )}
    </div>
  );
};

export default CommentSection;
