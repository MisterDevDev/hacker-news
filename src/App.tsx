import React, { useState, useEffect } from "react";
import Story from "./components/Story";
import { QueryDetails } from "../types/component";
import Pagination from "./components/Pagination";
import axios from "axios";

const App: React.FC = () => {
  const [storyIds, setStoryIds] = useState([]);
  const [currentStories, setCurrentStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [storiesPerPage] = useState(10);

  const fetchDetails = async (stories: number[]) => {
    setCurrentStories((await axios.post("/api/details", stories)).data);
  };

  useEffect(() => {
    const fetchStories = async () => {
      const allStories = (await axios.get("/api//stories")).data.slice(0, 100);
      setStoryIds(allStories);
      fetchDetails(allStories.slice(0, 10));
      setLoading(true);
    };
    fetchStories();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStories]);

  const paginate = (pageNumber: number): void => {
    const indexOfLastStory = pageNumber * storiesPerPage;
    const indexOfFirstStory = indexOfLastStory - storiesPerPage;
    const displayStories = storyIds.slice(indexOfFirstStory, indexOfLastStory);
    fetchDetails(displayStories);
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
        {currentStories.map((story: QueryDetails) => {
          return <Story key={story.id} details={story} />;
        })}
        <Pagination
          storiesPerPage={storiesPerPage}
          totalStories={storyIds.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default App;
