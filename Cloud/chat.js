
const logger = Moralis.Cloud.getLogger();

const JOINED_TABLE = "ChatsJoined";
const CHAT_TABLE = "Chats";






Moralis.Cloud.define('getAvailableRooms', async (request) => {
    let query = new Moralis.Query(JOINED_TABLE);
    query.includeAll()
    query.equalTo("youraccount", request.user);
    query.ascending("createdAt")
    const Results = await query.find();
    return Results;
},{
    requireUser: true
});








async function saveNewRoom(roomName,user) {

    const RoomName = Moralis.Object.extend(CHAT_TABLE);
    const chat = new RoomName();
    chat.set("title", roomName);
    chat.set("creator", user);
    await chat.save();



    //Create Instance For Join Chat Rooms

    const Joined = Moralis.Object.extend("ChatsJoined");
    const chatRoom = new Joined();
    chatRoom.set("chatID", chat);
    chatRoom.set("youraccount", user);
    await chatRoom.save();

}




Moralis.Cloud.define('createNewRoom', async (request) => {
    
    await saveNewRoom(request.params.roomName,request.user);

    return "Created"

},{
    requireUser: true
});



Moralis.Cloud.afterSave("createNewRoom", (request) => {
    const query = new Moralis.Query("Post");
    query.get(request.object.get("post").id)

      .then(function(post) {
        post.increment("comments");
        return post.save();
      })
      .catch(function(error) {
        console.error("Got an error " + error.code + " : " + error.message);
      });
});


















