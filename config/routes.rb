Rails.application.routes.draw do
  post '/auth/login', to: 'authentications#login'
  get '/auth/verify', to: 'authentications#verify'
  resources :flavors, only: :index
  resources :foods
  resources :users, only: :create
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
