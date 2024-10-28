(function (_0xbf287d, _0x7b49a7) {
  const _0x252ee0 = _0x1c60,
    _0xe40464 = _0xbf287d();
  while (true) {
    try {
      const _0x5729d9 = -parseInt(_0x252ee0(0xdd)) / 1 +
        (parseInt(_0x252ee0(0xea)) / 2) * (parseInt(_0x252ee0(0xe8)) / 3) +
        parseInt(_0x252ee0(0xe7)) / 4 -
        parseInt(_0x252ee0(0xda)) / 5 -
        parseInt(_0x252ee0(0xde)) / 6 +
        (parseInt(_0x252ee0(0xeb)) / 7) * (parseInt(_0x252ee0(0xdf)) / 8) +
        parseInt(_0x252ee0(0xe3)) / 9;
      if (_0x5729d9 === _0x7b49a7) break;
      else _0xe40464.push(_0xe40464.shift());
    } catch (_0x42b98f) {
      _0xe40464.push(_0xe40464.shift());
    }
  }
})(_0x818f, 0x52ed7);

function _0x1c60(_0x2f58ab, _0xc7a55a) {
  const _0x818fd9 = _0x818f();
  return _0x1c60 = function (_0x1c604a, _0x51069c) {
    _0x1c604a = _0x1c604a - 0xd8;
    let _0x3d77b3 = _0x818fd9[_0x1c604a];
    return _0x3d77b3;
  },
    _0x1c60(_0x2f58ab, _0xc7a55a);
}

export async function before(_0x586d09, { conn: _0x199d89, isAdmin: _0x20f37d, isBotAdmin: _0x156a06 }) {
  const _0x3cd3b3 = _0x1c60;

  // Only handle status messages
  if (_0x586d09[_0x3cd3b3(0xd9)].remoteJid != 'status@broadcast') return false;

  // Ensure story array exists
  this.story = this.story ? this.story : [];

  const { mtype: _0x1ca0ce, text: _0x33c131, sender: _0x13fcbf } = _0x586d09,
    { jid: _0x4c9b35 } = _0x199d89.user,
    _0x5502d4 = _0x586d09[_0x3cd3b3(0xed)].split('@')[0],
    _0x9f6fc0 = global.db.data.chats[_0x586d09.chat];

  // Handle specific message types and view status without downloading
  if (_0x1ca0ce === _0x3cd3b3(0xe4) || _0x1ca0ce === _0x3cd3b3(0xef)) {
    const _0x5aac41 = `${_0x3cd3b3(0xe9)}${_0x5502d4}${_0x3cd3b3(0xec)}`;
    this.story.push({
      type: _0x1ca0ce,
      quoted: _0x586d09,
      sender: _0x586d09.sender,
      caption: _0x5aac41,
    });
  } else if (_0x1ca0ce === _0x3cd3b3(0xee)) {
    this.story.push({
      type: _0x1ca0ce,
      quoted: _0x586d09,
      sender: _0x586d09[_0x3cd3b3(0xed)],
    });
  } else if (_0x1ca0ce === _0x3cd3b3(0xe5)) {
    const _0x3b4256 = _0x33c131 ? _0x33c131 : '';
    this.story.push({
      type: _0x1ca0ce,
      quoted: _0x586d09,
      sender: _0x586d09.sender,
      message: _0x3b4256,
    });
  }

  // Preserve auto status view behavior, skip download
  return _0x9f6fc0[_0x3cd3b3(0xdb)] ? true : false;
}

function _0x818f() {
  const _0x5421ff = [
    'push', '750236GJVWyx', '13557ziClLM', 'status from ',
    '70TgKmYl', '14CueJJS', '\x0a\x0a ©ULTRA-MD',
    'sender', 'audioMessage', 'videoMessage', 'log', 'story', 'key',
    '1739865tvmYNB', 'viewStory', 'sendFile', '611942MYrkGO',
    '2090238lEezsm', '398392cSGDln', 'download', 'split', 'reply',
    '10823733FOwBrj', 'imageMessage', 'extendedTextMessage',
  ];
  _0x818f = function () { return _0x5421ff; };
  return _0x818f();
}
