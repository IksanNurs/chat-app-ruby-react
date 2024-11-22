class MessagesController < ApplicationController
  def create
    @chatroom = Chatroom.find(params[:chatroom_id])
    @message = @chatroom.messages.create(message_params)
    render json: @message
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end
end
