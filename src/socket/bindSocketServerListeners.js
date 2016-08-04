export default function (dependencies) {
  if (!dependencies.io) {
    throw new Error('The socket connection must be provided.');
  }

  if (!dependencies.db) {
    throw new Error('The database connection must be provided.');
  }

  const io = dependencies.io;

  io.sockets.on('connection', () => {

  });
}
