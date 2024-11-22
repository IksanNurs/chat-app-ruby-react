import consumer from "./consumer"

consumer.subscriptions.create({ channel: "ChatroomChannel", chatroom_id: "1" }, {
  received(data) {
    console.log(data)
  }
})
