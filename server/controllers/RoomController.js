import RoomModel from '../models/Room.js';

export const create = async (req, res) => {
  try {
    const doc = new RoomModel({
      roomId: req.body.roomId,
      stage: 'joining',
      users: [],
      pairs: {},
    });

    const room = await doc.save();

    res.status(201).json({
      roomId: req.body.roomId,
      userRole: 'admin',
      error: null,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Помилка! Спробуйте ще раз',
    });
  }
};

export const isExist = async (req, res) => {
  try {
    await RoomModel.findOne({ roomId: req.params.roomId }).exec((err, room) => {
      if (err) return res.json({ error: 'Помилка 500, DB' });
      if (!room) return res.json({ error: 'Такої гри не існує' });
      res.status(200).json({
        roomId: req.params.roomId,
        userRole: 'player',
        error: null,
      });
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: 'Помилка: 500',
    });
  }
};

export const getRoom = async (roomId) => {
  try {
    const room = await RoomModel.findOne({ roomId: roomId });
    return room;
  } catch (err) {
    console.log(err);
  }
};

export const getRoomStage = async (roomId) => {
  try {
    const room = await RoomModel.findOne({ roomId: roomId });
    return room.stage;
  } catch (err) {
    console.log(err);
  }
};

export const getUsers = async (roomId) => {
  try {
    const room = await RoomModel.findOne({ roomId: roomId });
    return room.users;
  } catch (err) {
    console.log(err);
  }
};

export const addUser = async (roomId, user) => {
  try {
    const updateRoom = await RoomModel.findOneAndUpdate(
      { roomId: roomId },
      { $push: { users: user } },
      { returnDocument: 'after' },
    );
    return updateRoom.users;
  } catch (err) {
    console.log(err);
  }
};

export const removeUser = async (roomId, socketId) => {
  try {
    const updateRoom = await RoomModel.findOneAndUpdate(
      { roomId: roomId },
      { $pull: { users: { socket: socketId } } },
      { returnDocument: 'after' },
    );
    return updateRoom.users;
  } catch (err) {
    console.log(err);
  }
};

export const updateUserSocket = async (roomId, userId, socketId) => {
  try {
    await RoomModel.updateOne(
      { roomId: roomId, users: { id: userId } },
      { $set: { socket: socketId } },
    );
  } catch (err) {
    console.log(err);
  }
};

// test
//
//
//
//
//

export const addUserWS = async (roomId, user) => {
  try {
    const doc = await RoomModel.updateOne(
      {
        roomId: roomId,
      },
      {
        $push: { users: user },
      },
    );
  } catch (err) {
    console.log(err);
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
