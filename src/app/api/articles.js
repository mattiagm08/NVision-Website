import articles from '../../resources/articles.json';

export default function handler(req, res) {
  res.status(200).json(articles);
}