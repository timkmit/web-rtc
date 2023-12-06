const ACTIONS = {
    JOIN          : 'join',
    LEAVE         : 'leave',
    SHARE_ROOMS   : 'share-rooms',
    REMOVE_PEER   : 'remove-peer',
    ADD_PEER      : 'add-peer',
    RELAY_SDP     : 'relay-sdp', //стримы с медиа данными
    RELAY_ICE     : 'relay-ice', // физ подключения
    ICE_CANDIDATE : 'ice-candidate', //реагируем
    SESSION_DESCRIPTION : 'session-description',
    
}

export default ACTIONS;
