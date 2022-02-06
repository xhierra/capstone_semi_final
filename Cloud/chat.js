
const logger = Moralis.Cloud.getLogger();

const JOINED_TABLE = "ChatsJoined";
const CHAT_TABLE = "Chats";
const CHATMESSAGE_TABLE = "ChatsMessage";
const TABLE_POST = "Post";
const TABLE_COMMENT = "PostComment";
const TABLE_REPLY = "PostReply";

const TABLE_ITEMS = "Item";




Moralis.Cloud.define('getItem', async (request) => {

    const Items = Moralis.Object.extend(TABLE_ITEMS);
    const query = new Moralis.Query(Items);

    const toSkip = ((request.params.page - 1 ) * request.params.pageSize);

    if(request.params.category != undefined){
        query.containedIn("category", request.params.category);
    }

    if(request.params.token != undefined){
        query.containedIn("tokenname", request.params.token);
    }

    if(request.params.min != undefined){
        query.lessThanOrEqualTo("price", request.params.min);
    }

    if(request.params.max != undefined){
        query.greaterThanOrEqualTo("price", request.params.max);
    }

    if(request.params.search != undefined){
        query.fullText("name", request.params.search);
    }
    

    query.equalTo("market", true);

    query.includeAll();
    query.descending('createdAt')



    query.skip(toSkip);
    query.limit(request.params.pageSize);
    query.withCount();
    const results = await query.find({useMasterKey:true});
    return results
});




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








Moralis.Cloud.define('getAllPost', async (request) => {

    const Post = Moralis.Object.extend(TABLE_POST);
    const query = new Moralis.Query(Post);

    const toSkip = ((request.params.page - 1 ) * request.params.pageSize);

    query.includeAll();
    query.descending('createdAt')



    query.skip(toSkip);
    query.limit(request.params.pageSize);
    query.withCount();
    const results = await query.find({useMasterKey:true});
    return results
});

Moralis.Cloud.define('get_user_post', async (request) => {

    const Post = Moralis.Object.extend(TABLE_POST);
    const query = new Moralis.Query(Post);

    console.log( "id "+ request.id )
    console.log( "user "+ request.user )


    query.equalTo("postedby", request.user );
    const result = await query.find( {useMasterKey:true} );


    return result
});



Moralis.Cloud.define('postHighLight', async (request) => {

    const Post = Moralis.Object.extend(TABLE_POST);
    const query = new Moralis.Query(Post);
    query.descending('createdAt')
    query.limit(3);
    query.includeAll();
    const results = await query.find({useMasterKey:true});
    return results
});



Moralis.Cloud.define('getItemReact', async (request) => {

    const Items = Moralis.Object.extend(TABLE_ITEMS);

    const item = new Items({
        id: request.params.id
    })

    const relation = item.relation("likes");

    const query = relation.query();
    query.withCount();

    const results = await query.find({useMasterKey:true});
    return results
});

Moralis.Cloud.define('getPostReact', async (request) => {

    const Posts = Moralis.Object.extend(TABLE_POST);

    const postID = new Posts({
        id: request.params.id
    })

    const relation = postID.relation("likes");

    const query = relation.query();
    query.withCount();

    const results = await query.find({useMasterKey:true});
    return results
});


Moralis.Cloud.define('getCommentReact', async (request) => {

    const Comment = Moralis.Object.extend(TABLE_COMMENT);

    const commentID = new Comment({
        id: request.params.id
    })

    const relation = commentID.relation("likes");

    const query = relation.query();
    query.withCount();

    const results = await query.find({useMasterKey:true});
    return results
});






Moralis.Cloud.define('getReplyReact', async (request) => {

    const Comment = Moralis.Object.extend(TABLE_REPLY);

    const commentID = new Comment({
        id: request.params.id
    })

    const relation = commentID.relation("likes");

    const query = relation.query();
    query.withCount();

    const results = await query.find({useMasterKey:true});
    return results
});






Moralis.Cloud.define('getPostComment', async (request) => {

    const Comments = Moralis.Object.extend(TABLE_COMMENT);
    const query = new Moralis.Query(Comments);

    query.includeAll();

    query.equalTo("postid", request.params.id);
    const results = await query.find({useMasterKey:true});
    return results
});


Moralis.Cloud.define('getPostReply', async (request) => {

    const Reply = Moralis.Object.extend(TABLE_REPLY);
    const query = new Moralis.Query(Reply);

    query.includeAll();

    query.equalTo("commentid", request.params.id);
    const results = await query.find({useMasterKey:true});
    return results
});



Moralis.Cloud.define('getMessages', async (request) => {

    const Messages = Moralis.Object.extend(CHATMESSAGE_TABLE);
    const query = new Moralis.Query(Messages);
    
    query.includeAll();
    query.equalTo("roomID", request.params.chatid);
    
    const results = await query.find({useMasterKey:true});
    return results
});











