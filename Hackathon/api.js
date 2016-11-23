import { Router } from 'express';

const router = new Router();

const users = [
  { id: 1, avatar: 'https://defaulter.betterworks.com/?text=JHON&size=200&hex=ffa500&cloudflare.png', name: 'John', age: 23 },
  { id: 2, avatar: 'https://defaulter.betterworks.com/?text=Amy&size=200&hex=0095f4&cloudflare.png', name: 'Amy', age: 18 },
];

// Write your restful api here:
router.get('/users', (req, res) => {
  res.json({ users });
});

router.get('/users/:id', (req, res) => {
  const id = req.params.id;
  const result = users.find(user => user.id === Number(id));
  res.json(result);
});

export default router;
