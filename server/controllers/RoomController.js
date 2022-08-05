import RoomModel from '../models/Room.js';

export const roomNew = async (req, res) => {
  try {
    const doc = new RoomModel({
      roomId: req.body.roomId,
      progress: 0,
      users: [req.body.userName],
      pairs: {},
    });

    const room = await doc.save();

    res.status(201).json({
      exist: true,
      roomId: req.body.roomId,
      userRole: 'admin',
      error: null,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      exist: false,
      error: 'Помилка! Спробуйте ще раз',
    });
  }
};

export const roomJoin = async (req, res) => {
  try {
    const doc = new RoomModel({
      roomId: req.body.roomId,
      progress: 0,
      users: [req.body.userName],
      pairs: {},
    });

    const room = await doc.save();

    res.status(201).json({
      exist: true,
      roomId: req.body.roomId,
      userRole: 'admin',
      error: null,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      exist: false,
      error: 'Помилка! Такої гри не існує',
    });
  }
};

export const wsRoomJoin = async (req, res) => {
  try {
    await RoomModel.updateOne(
      {
        roomId: req.body.roomId,
      },
      {
        $push: { users: req.body.userName },
      },
    );
    res.status(201).json({
      message: 'user was add',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error: user didnt add',
    });
  }
};

const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить тэги',
    });
  }
};
const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не удалось вернуть статью',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Статья не найдена',
          });
        }

        res.json(doc);
      },
    ).populate('user');
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не удалось удалить статью',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Статья не найдена',
          });
        }

        res.json({
          success: true,
        });
      },
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};
