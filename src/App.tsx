import React, { useState, useEffect } from "react";
import Story from "./components/Story";
import { StoryDetails } from "../types/component";
import Pagination from "./components/Pagination";
import axios from "axios";

const App: React.FC = () => {
  const [top100Stories, setTop100Stories] = useState([]);
  const [currentStories, setCurrentStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [storiesPerPage] = useState(10);

  //fetches top 500 story details, puts them in order by score, and saves the top 100 stories
  const fetchStories = async (stories: number[]) => {
    const top500Stories = (await axios.post("/api/details", stories)).data.sort(
      (a: StoryDetails, b: StoryDetails) => {
        return b.score - a.score;
      }
    );
    setTop100Stories(top500Stories.slice(0, 100));
    setCurrentStories(top500Stories.slice(0, 10));
    setLoading(true);
  };

  //gets ids for top 500 stories
  useEffect(() => {
    (async () => {
      fetchStories((await axios.get("/api//stories")).data);
    })();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStories]);

  const paginate = (pageNumber: number): void => {
    const indexOfLastStory = pageNumber * storiesPerPage;
    const indexOfFirstStory = indexOfLastStory - storiesPerPage;
    setCurrentStories(top100Stories.slice(indexOfFirstStory, indexOfLastStory));
  };

  return (
    <div className="main-container">
      <div className="page-title">
        <img src="https://techcrunch.com/wp-content/uploads/2013/05/hacker-news1.jpg" />
        {loading ? (
          ""
        ) : (
          <h2>
            <i className="fa fa-clock-o" aria-hidden="true"></i>Loading...
          </h2>
        )}
      </div>
      <div>
        {currentStories.map((story: StoryDetails) => {
          return <Story key={story.id} details={story} />;
        })}
        <Pagination
          storiesPerPage={storiesPerPage}
          totalStories={top100Stories.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default App;
