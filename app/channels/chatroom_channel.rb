class ChatroomChannel < ApplicationCable::Channel
    def subscribed
      stream_for Chatroom.find(params[:chatroom_id])
    end
  
    def unsubscribed
      # Clean up any resources when channel is unsubscribed
    end
  end
  