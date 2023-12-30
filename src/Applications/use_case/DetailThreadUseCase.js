const DetailThread = require('../../Domains/threads/entities/DetailThread');
const DetailComment = require('../../Domains/comments/entities/DetailComment');

class DetailThreadUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const { thread: threadId } = new DetailThread(useCasePayload);
    await this._threadRepository.verifyThreadIsExist(threadId);
    const thread = await this._threadRepository.getDetailThread(threadId);
    const getCommentsThread = await this._commentRepository.getCommentsThread(threadId);
    thread.comments = new DetailComment({ comments: getCommentsThread }).comments;
    return {
      thread,
    };
  }
}

module.exports = DetailThreadUseCase;
