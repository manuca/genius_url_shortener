Rails.application.routes.draw do
  resources :urls, only: [:create]
  resources :visits, only: [:index]
  get '*shortcode' => 'redirects#show'
  root to: 'urls#new'
end
