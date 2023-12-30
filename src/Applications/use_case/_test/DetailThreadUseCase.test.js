const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DetailThreadUseCase = require('../DetailThreadUseCase');

describe('DetailThreadUseCase', () => {
  it('should orchestracting the get thread detail correctly', async () => {
    const useCasePayload = 'thread-123';

    const expectedThread = {
      id: 'thread-123',
      title: 'A Thread',
      body: 'A Body',
      date: '2023-12-28T17:40:48.040Z',
      username: 'dicoding',
    };

    const expectedComment = [
      {
        id: 'comment-123',
        username: 'dicoding',
        date: '2023-12-28T17:50:48.040Z',
        content: 'A Comment',
        is_delete: 0,
      },
      {
        id: 'comment-321',
        username: 'dicoding',
        date: '2023-12-28T17:55:48.040Z',
        content: 'deleted comment',
        is_delete: 1,
      },
    ];

    const expectedDetailThread = {
      thread: {
        id: 'thread-123',
        title: 'A Thread',
        body: 'A Body',
        date: '2023-12-28T17:40:48.040Z',
        username: 'dicoding',
        comments: [
          {
            id: 'comment-123',
            username: 'dicoding',
            date: '2023-12-28T17:50:48.040Z',
            content: 'A Comment',
          },
          {
            id: 'comment-321',
            username: 'dicoding',
            date: '2023-12-28T17:55:48.040Z',
            content: '**komentar telah dihapus**',
          },
        ],
      },
    };

    /** creating dependency of use case */
    const expectedThreadRepository = new ThreadRepository();
    const expectedCommentRepository = new CommentRepository();

    /** mocking needed function */
    expectedThreadRepository.verifyThreadIsExist = jest.fn(() => Promise.resolve());
    expectedThreadRepository.getDetailThread = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedThread));
    expectedCommentRepository.getCommentsThread = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedComment));

    /** creating use case instance */
    const detailThreadUseCase = new DetailThreadUseCase({
      threadRepository: expectedThreadRepository,
      commentRepository: expectedCommentRepository,
    });

    // Action
    const thread = await detailThreadUseCase.execute(useCasePayload);
    expect(expectedThreadRepository.getDetailThread)
      .toHaveBeenCalledWith(useCasePayload);
    expect(expectedCommentRepository.getCommentsThread)
      .toHaveBeenCalledWith(useCasePayload);
    expect(thread).toStrictEqual(expectedDetailThread);
  });
});
