const router = require("express").Router();
import { Application, Request, Response, NextFunction } from "express";
import axios from "axios";
module.exports = router;

const topStoriesApi =
  "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";

const singleStoryApi =
  "https://hacker-news.firebaseio.com/v0/item"; /* /{itemId}.json?print=pretty */

router.post(
  "/details",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const results = await Promise.all(
        req.body.map(async (id: number) => {
          const response = await axios.get(
            `${singleStoryApi}/${id}.json?print=pretty`
          );
          return response.data;
        })
      );
      res.send(results);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get(
  "/stories",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send(
        (
          await axios.get(
            `${topStoriesApi}`
          )
        ).data
      );
    } catch (error) {
      console.log(error);
    }
  }
);

router.post(
  "/comments",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const results = await Promise.all(
        req.body.map(async (id: number) => {
          const response = await axios.get(
            `${singleStoryApi}/${id}.json?print=pretty`
          );
          return response.data;
        })
      );
      res.send(results);
    } catch (error) {
      console.log(error);
    }
  }
);
