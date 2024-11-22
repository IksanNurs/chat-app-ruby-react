Rails.application.routes.draw do
  resources :chatrooms, only: [:show] do
    resources :messages, only: [:create]
  end
end