const arrayBufferToBuffer = (ab) => {
    const buffer = new Buffer.alloc(ab.byteLength);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buffer.length; i++) {
        buffer[i] = view[i];
    }
    return buffer;
};

export default arrayBufferToBuffer;