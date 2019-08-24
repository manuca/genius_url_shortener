Rails.application.routes.draw do
  resources :urls, only: [:new, :create]
end
