import React, { useState, useEffect } from "react";
import { commentSectionProps, QueryDetails } from "../../types/component";
import axios from "axios";

import Comment from "./Comment";

const CommentSection: React.FC<commentSectionProps> = ({ kids }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await axios.post("/api/comments", kids);
      setComments(data);
    };
    fetchComments();
    setLoading(true);
  }, []);

  return (
    <div className="comment-block">
      {loading ? (
        <div>
          {comments.map((comment: QueryDetails) => {
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
