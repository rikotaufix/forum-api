class DetailThread {
  constructor(payload) {
    this._verifyPayload(payload);

    const thread = payload;
    this.thread = thread;
  }

  _verifyPayload(payload) {
    if (!payload) {
      throw new Error('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof payload !== 'string') {
      throw new Error('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DetailThread;
