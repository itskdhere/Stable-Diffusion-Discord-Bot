import crypto from 'crypto';

async function hash(max) {
    const chars = "qwertyuopasdfghjklizxcvbnm0123456789";

    let sessionHash = "";

    for (let i = 0; i < max; i++) {
        sessionHash += chars[Math.floor(Math.random() * chars.length)];
    }

    console.log('session_hash: ' + sessionHash);

    return sessionHash;
}

export default hash;